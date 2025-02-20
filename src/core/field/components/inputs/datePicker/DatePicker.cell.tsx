import React, { useMemo, useState } from 'react'

import { IDatePickerCell } from '../../../datePickerBase/DatePicker.types'

interface IDatePickerCellProps {
    item: IDatePickerCell
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell: React.FC<IDatePickerCellProps> = ({ item, onMouseEnter, onSelected }) => {
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

    const monthScope = useMemo(() => {
        return item.item?.isNextMonth ? 'next' : item.item?.isPreviousMonth ? 'previous' : 'current'
    }, [item])

    return (
        <div
            className={`date-cell ${cellItem.item?.selected ? 'selected' : ''} ${monthScope}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
        >
            {cellItem.id}
        </div>
    )
}

export default DatePickerCell
