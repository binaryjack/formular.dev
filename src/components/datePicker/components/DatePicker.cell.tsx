import React, { useEffect, useMemo, useState } from 'react'

import { DatePickerGridModeType, DatePickerSelectionModeType } from '../core/DatePicker.types'
import { IDatePickerCell } from '../core/models/DatePicker.models'
import DatePickerCellDay from './DatePicker.cell.day'
import DatePickerCellMonth from './DatePicker.cell.month'
import DatePickerCellYear from './DatePicker.cell.year'

interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    selectionMode: DatePickerSelectionModeType
    gridMode: DatePickerGridModeType
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell = ({
    item,
    onMouseEnter,
    onSelected,
    selectionMode,
    gridMode,
    selectedCells
}: IDatePickerCellProps) => {
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
                {gridMode === 'DAY' && <DatePickerCellDay cellItem={cellItem} />}
                {gridMode === 'YEAR' && <DatePickerCellYear cellItem={cellItem} />}
                {gridMode === 'MONTH' && <DatePickerCellMonth cellItem={cellItem} />}
            </div>
        </div>
    )
}

export default DatePickerCell
