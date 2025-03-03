import React, { useEffect, useMemo, useState } from 'react'

import { DatePickerMode } from '../../../../../dependency/dateModels'
import { IDatePickerCell } from '../../../datePickerBase/DatePicker.types'

interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    mode: DatePickerMode
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell: React.FC<IDatePickerCellProps> = ({
    item,
    onMouseEnter,
    onSelected,
    mode,
    selectedCells
}) => {
    const [cellItem, setCellItem] = useState<IDatePickerCell>(item)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        onMouseEnter(item)
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!cellItem?.item) return

        const newCellItem = { ...cellItem }

        if (!newCellItem?.item) return
        newCellItem.item.selected = !newCellItem.item.selected
        setCellItem(newCellItem)

        onSelected(item)
    }

    useEffect(() => {
        if (!cellItem) return
        if (selectedCells.length === 0) return
        const newCellItem = { ...cellItem }
        if (!newCellItem?.item) return

        if (mode === 'range') {
            newCellItem.item.selected = !!selectedCells.find((o) => o.code === cellItem.code)
        } else {
            newCellItem.item.selected = selectedCells[0].code === cellItem.code
        }

        setCellItem(newCellItem)
    }, [selectedCells, mode])

    const monthScope = useMemo(() => {
        return item.item?.isNextMonth ? 'next' : item.item?.isPreviousMonth ? 'previous' : 'current'
    }, [item])

    return (
        <div
            className={`date-cell ${cellItem.item?.selected ? 'selected' : ''} ${monthScope}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            data-code={cellItem?.code}
        >
            {cellItem.id}
        </div>
    )
}

export default DatePickerCell
