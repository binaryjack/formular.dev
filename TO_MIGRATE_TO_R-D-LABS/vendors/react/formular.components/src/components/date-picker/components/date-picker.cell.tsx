import React, { useEffect, useMemo, useState } from 'react'

import { ifClass, newIFClass } from 'formular.dev.lib'
import { DatePickerDisplayType } from '../core/date-picker.types'
import { IDatePickerCell } from '../core/models/date-picker.models'
import DatePickerSwitch from './date-picker.switch'
interface IDatePickerCellProps {
    item: IDatePickerCell
    selectedCells: IDatePickerCell[]
    gridDisplayMode: DatePickerDisplayType
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

/**
 * A React functional component representing a single cell in a date picker grid.
 *
 * @param {IDatePickerCellProps} props - The properties passed to the component.
 * @param {IDatePickerCell} props.item - The data for the current cell, including date and selection state.
 * @param {(item: IDatePickerCell) => void} props.onMouseEnter - Callback triggered when the mouse enters the cell.
 * @param {(item: IDatePickerCell) => void} props.onSelected - Callback triggered when the cell is clicked.
 * @param {string} props.gridDisplayMode - The display mode of the grid (e.g., day, month, year).
 * @param {IDatePickerCell[]} props.selectedCells - The list of currently selected cells.
 *
 * @returns {JSX.Element} A styled `div` element representing the date picker cell, with event handlers for mouse enter and click.
 *
 * @remarks
 * - The component uses `useState` to manage the state of the cell item.
 * - The `useEffect` hook updates the cell's selection state based on the `selectedCells` prop.
 * - The `useMemo` hook is used to compute derived values such as `scope`, `day`, `month`, and `year` for performance optimization.
 * - The `ifClass` utility is used to dynamically generate CSS class names based on the cell's state.
 *
 * @example
 * ```tsx
 * <DatePickerCell
 *   item={cellItem}
 *   onMouseEnter={handleMouseEnter}
 *   onSelected={handleCellSelected}
 *   gridDisplayMode="day"
 *   selectedCells={selectedCells}
 * />
 * ```
 */
const DatePickerCell = ({
    item,
    onMouseEnter,
    onSelected,
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
    }, [selectedCells])

    const scope = useMemo(() => {
        return item.item?.isNextScope ? 'next' : item.item?.isPreviousScope ? 'previous' : 'current'
    }, [item])

    const day = useMemo(() => {
        return cellItem.id
    }, [item])

    const month = useMemo(() => {
        return (cellItem?.item?.date?.dateObject.month ?? 0) + 1
    }, [item])

    const year = useMemo(() => {
        return cellItem?.item?.date?.dateObject.year
    }, [item])

    const classes = ifClass([
        newIFClass('is-now', cellItem.item?.isNow),
        newIFClass('is-weekend', cellItem.item?.isWeekEnd),
        newIFClass('selected', cellItem.item?.selected)
    ])

    return (
        <div
            className={`date-cell ${classes} ${scope} `}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            data-code={cellItem?.code}
        >
            <div>
                <DatePickerSwitch
                    definedGridMode={gridDisplayMode}
                    day={<span> {day}</span>}
                    year={<span> {year}</span>}
                    month={<span> {month}</span>}
                />
            </div>
        </div>
    )
}

export default DatePickerCell
