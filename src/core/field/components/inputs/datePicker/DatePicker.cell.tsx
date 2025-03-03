import React, { useEffect, useMemo, useState } from 'react'

import { DatePickerGridMode, DatePickerSelectionMode } from '../../../../../dependency/dateModels'
import { IDatePickerCell } from '../../../datePickerBase/DatePicker.types'

interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    selectionMode: DatePickerSelectionMode
    gridMode: DatePickerGridMode
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell: React.FC<IDatePickerCellProps> = ({
    item,
    onMouseEnter,
    onSelected,
    selectionMode,
    gridMode,
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

        if (cellItem.item.isCurrentMonth) {
            const newCellItem = { ...cellItem }
            if (!newCellItem?.item) return
            newCellItem.item.selected = !newCellItem.item.selected
            setCellItem(newCellItem)
        }
        onSelected(item)
    }

    useEffect(() => {
        if (!cellItem) return
        const newCellItem = { ...cellItem }
        if (!newCellItem?.item) return
        newCellItem.item.selected = !!selectedCells.find((o) => o.code === cellItem.code)
        setCellItem(newCellItem)
    }, [selectedCells, selectionMode])

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
            <div>
                {gridMode === 'DAY' && <span> {cellItem.id}</span>}
                {gridMode === 'YEAR' && <span> {cellItem.item?.date?.dateObject.year}</span>}
                {gridMode === 'MONTH' && <span> {cellItem.item?.date?.dateObject.month}</span>}
            </div>
        </div>
    )
}

export default DatePickerCell
