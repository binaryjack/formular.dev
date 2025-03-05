import { useCallback, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

import { DatePickerGridMode, DatePickerSelectionMode } from '../../dependency/dateModels'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { IDatePickerCell, IDatePickerRow } from '../../field/datePickerBase/DatePicker.types'
import {
    computeGrid,
    computeRange,
    getNextDate,
    getPreviousDate
} from '../../field/datePickerBase/DatePicker.utils'
import { DrawerOpenStateType } from '../../field/drawer/Drawer.types'
import DatePickerCell from './components/DatePicker.cell'
import DatePickerDrawerHeader from './DatePicker.header'

interface IDatePickerDrawerProps {
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    defaultDate?: INDate | Date
    onSelectDate: (startDate?: INDate, endDate?: INDate) => void
}

const DatePickerDrawer = ({
    drawerOpenState,
    defaultDate,
    onSetOpenState,
    onSelectDate
}: IDatePickerDrawerProps) => {
    const [gridMode, setGridMode] = useState<DatePickerGridMode>('MONTH')
    const [selectionMode, setSelectionMode] = useState<DatePickerSelectionMode>('single')

    const [dateGrid, setDateGrid] = useState<IDatePickerRow[]>([])
    const [dateInfos, setDateInfos] = useState<string>('')
    const [selection, setSelection] = useState<IDatePickerCell[]>([])

    const [internalDate, setInternalDate] = useState<Date>()
    const [selectedCellsIds, setSelectedCellsIds] = useState<number[]>([])

    const [internalSelectedDate, setInternalSelectedDate] = useState<INDate>()

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const updateGrid = useCallback(() => {
        if (!internalDate) return
        const gridData = computeGrid(internalDate)
        setDateGrid(gridData)

        // setInternalSelectedDate({
        //     day: internalDate.getDate(),
        //     month: internalDate.getMonth(),
        //     year: internalDate.getFullYear()
        // })

        console.log('render')
    }, [internalDate])

    useEffect(() => {
        /** If the defaultDate is undefined */
        if (!defaultDate) {
            setInternalDate(new Date())
            return
        }
        /** If the defaultDate is of type Date */
        if (defaultDate instanceof Date) {
            setInternalDate(defaultDate)
            return
        }
        /** if not defaultDate is of type of INdate */
        setInternalDate(new Date(defaultDate.year, defaultDate.month, defaultDate.day))
    }, [defaultDate])

    useEffect(() => {
        updateGrid()
    }, [internalDate])

    useEffect(() => {
        if (selection.length === 0) return
        const startDate = selection?.[0]?.item?.date?.dateObject
        const endDate =
            selection.length > 1
                ? selection?.[selection.length - 1]?.item?.date?.dateObject
                : undefined

        onSelectDate(startDate, endDate)
    }, [selection])

    const handleDisplayInfos = (cell: IDatePickerCell) => {
        // if (cell?.item === null) return
        // const day = (cell?.item.date.day?.() ?? 0).toString().padStart(2, '0')
        // const month = (cell?.item.date.month?.() ?? 0).toString().padStart(2, '0')
        // const year = (cell?.item.date.year?.() ?? 0).toString().padStart(4, '0')
        // const dow = cell?.item.date.dayOfWeek.toString()
        // setDateInfos(`${year}-${month}-${day}: DOW: ${dow}`)
    }

    const daySelections = (cell: IDatePickerCell) => {
        if (cell.item?.isNextMonth) {
            if (!internalDate) return
            setInternalDate(getNextDate(gridMode, internalDate))
            return
        }
        if (cell.item?.isPreviousMonth) {
            if (!internalDate) return
            setInternalDate(getPreviousDate(gridMode, internalDate))
            return
        }

        if (selectionMode === 'single' || selection.length > 1) {
            setSelection([cell])
            return
        }
        let newSelection: IDatePickerCell[] = []

        newSelection = [...selection, cell].sort((a, b) => a.ts - b.ts)
        newSelection.push(...computeRange(newSelection))

        setSelection(newSelection.sort((a, b) => a.ts - b.ts))
    }

    const monthSelection = (cell: IDatePickerCell) => {}

    const yearSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        cell: IDatePickerCell
    ) => {}

    const handleSelectedCell = (cell: IDatePickerCell) => {
        switch (gridMode) {
            case 'YEAR':
                monthSelection(cell)
                break
            case 'MONTH':
                monthSelection(cell)
                break

            case 'DAY':
            default:
                daySelections(cell)
                break
        }
    }

    const updateInternalDate = (newDate: Date) => setInternalDate(newDate)
    const updateGridMode = (gridMode: DatePickerGridMode) => setGridMode(gridMode)

    const handleSelectMode = (e: React.SyntheticEvent<HTMLSelectElement, Event>) =>
        setSelectionMode(e.currentTarget.value as DatePickerSelectionMode)

    const handleClearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        setSelection([])

    const handleSelectGridMode = (e: React.SyntheticEvent<HTMLSelectElement, Event>) =>
        updateGridMode(e.currentTarget.value as DatePickerGridMode)

    return (
        <div className={`date-picker-drawer`} onClick={handleOnClick}>
            <DatePickerDrawerHeader
                gridMode={gridMode}
                internalDate={internalDate ?? new Date()}
                updateInternalDate={updateInternalDate}
                updateGridMode={updateGridMode}
            />
            <div>
                <select title="modeselection" onChange={handleSelectMode}>
                    <option value="single">Single</option>
                    <option value="range">Range</option>
                </select>
            </div>
            <div>
                <select title="gridMode" onChange={handleSelectGridMode}>
                    <option value="DAY">Day</option>
                    <option value="MONTH">Month</option>
                    <option value="YEAR">Year</option>
                </select>
            </div>
            <div>
                <button
                    type="button"
                    className={`btn-sm-p mr-1`}
                    title={`btn-day-mode`}
                    onClick={handleClearSelection}
                >
                    <FaWindowClose />
                </button>
            </div>

            <div className={`date-picker-body`}>
                {dateGrid.map((dateRow) => (
                    <div key={dateRow.id} className={`date-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
                                selectionMode={selectionMode}
                                gridMode={gridMode}
                                selectedCells={selection}
                                onMouseEnter={handleDisplayInfos}
                                onSelected={handleSelectedCell}
                                item={dateRow}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>{dateInfos}</div>
            <div>
                {JSON.stringify(
                    selection.reduce<number[]>((acc, item) => {
                        acc.push(item.ts)
                        return acc
                    }, [])
                )}
            </div>
        </div>
    )
}

export default DatePickerDrawer
