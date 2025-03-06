import React, { useEffect, useMemo, useState } from 'react'

import { DatePickerDisplayType, DatePickerSelectionModeType } from '../core/DatePicker.types'
import { IDatePickerCell } from '../core/models/DatePicker.models'
import DatePickerCellDay from './DatePicker.cell.day'
import DatePickerCellMonth from './DatePicker.cell.month'
import DatePickerCellYear from './DatePicker.cell.year'

interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    selectionMode: DatePickerSelectionModeType
    gridDisplayMode: DatePickerDisplayType
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell = ({
    item,
    onMouseEnter,
    onSelected,
    selectionMode,
    gridDisplayMode,
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

        if (cellItem.item.isCurrentScope) {
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
        return item.item?.isNextScope ? 'next' : item.item?.isPreviousScope ? 'previous' : 'current'
    }, [item])

    return (
        <div
            className={`date-cell ${cellItem.item?.selected ? 'selected' : ''} ${monthScope}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            data-code={cellItem?.code}
        >
            <div>
                {gridDisplayMode === 'DAY' && <DatePickerCellDay cellItem={cellItem} />}
                {gridDisplayMode === 'YEAR' && <DatePickerCellYear cellItem={cellItem} />}
                {gridDisplayMode === 'MONTH' && <DatePickerCellMonth cellItem={cellItem} />}
            </div>
        </div>
    )
}

export default DatePickerCell
