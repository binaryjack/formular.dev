import { useCallback, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

import { DrawerOpenStateType } from '../../core/base/drawer/Drawer.types'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerContext, IDatePickerContext } from './components/DatePicker.context'
import { DatePickerGridModeType, DatePickerSelectionModeType } from './core/DatePicker.types'
import {
    computeDaysGrid,
    computeMonthsGrid,
    computeYearsGrid,
    getNextDate,
    getPreviousDate
} from './core/DatePicker.utils'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'
import DatePickerBodyDays from './DatePicker.body.days'
import DatePickerBodyMonths from './DatePicker.body.months'
import DatePickerBodyYears from './DatePicker.body.years'
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
    const [gridMode, setGridMode] = useState<DatePickerGridModeType>('DAY')
    const [selectionMode, setSelectionMode] = useState<DatePickerSelectionModeType>('single')

    const [gridData, setGridData] = useState<IDatePickerRow[]>([])
    const [dateInfos, setDateInfos] = useState<string>('')
    const [selection, setSelection] = useState<IDatePickerCell[]>([])

    const [internalDate, setInternalDate] = useState<Date>()
    const [selectedCellsIds, setSelectedCellsIds] = useState<number[]>([])

    const [internalSelectedDate, setInternalSelectedDate] = useState<INDate>()

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const resetTo = (now: boolean) => {
        if (!internalDate || selection.length === 0) return

        const daysData = now ? new Date() : selection[0].item?.date?.toDate?.()
        setInternalDate(daysData)
    }

    const updateGrid = useCallback(() => {
        if (!internalDate) return

        switch (gridMode) {
            case 'MONTH':
                const monthData = computeMonthsGrid(internalDate)
                setGridData(monthData)

                break
            case 'YEAR':
                const yearData = computeYearsGrid(internalDate)
                setGridData(yearData)
                break
            case 'DAY':
            default:
                const daysData = computeDaysGrid(internalDate)
                setGridData(daysData)
                break
        }
    }, [internalDate, gridMode])

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
    }, [internalDate, gridMode])

    useEffect(() => {
        if (selection.length === 0) return
        const startDate = selection?.[0]?.item?.date?.toINDate?.()
        const endDate =
            selection.length > 1
                ? selection?.[selection.length - 1]?.item?.date?.toINDate?.()
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

    const monthSelection = (cell: IDatePickerCell) => {}

    const yearSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        cell: IDatePickerCell
    ) => {}

    const updateInternalDate = (newDate: Date) => setInternalDate(newDate)
    const updateGridMode = (gridMode: DatePickerGridModeType) => setGridMode(gridMode)
    const updateSelectedCells = (cells: IDatePickerCell[]) => setSelection(cells)

    const handleSelectMode = (e: React.SyntheticEvent<HTMLSelectElement, Event>) =>
        setSelectionMode(e.currentTarget.value as DatePickerSelectionModeType)

    const handleClearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        setSelection([])

    const handleSelectGridMode = (e: React.SyntheticEvent<HTMLSelectElement, Event>) =>
        updateGridMode(e.currentTarget.value as DatePickerGridModeType)

    const previous = (forceGridMode?: DatePickerGridModeType) => {
        updateInternalDate(getPreviousDate(forceGridMode ?? gridMode, internalDate ?? new Date()))
    }
    const next = (forceGridMode?: DatePickerGridModeType) => {
        updateInternalDate(getNextDate(forceGridMode ?? gridMode, internalDate ?? new Date()))
    }

    const datePickerContextDefault: IDatePickerContext = {
        selectionMode: selectionMode,
        internalDate: internalDate ?? new Date(),
        gridData: gridData,
        selectedCells: selection,
        updateInternalDate: updateInternalDate,
        updateSelectedCells: updateSelectedCells,
        updateGridMode: updateGridMode,
        next: next,
        previous: previous,
        resetTo: resetTo
    }

    return (
        <DatePickerContext.Provider value={datePickerContextDefault}>
            <div className={`date-picker-drawer`} onClick={handleOnClick}>
                <DatePickerDrawerHeader />
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
                    {gridMode === 'YEAR' ? (
                        <DatePickerBodyYears />
                    ) : gridMode === 'MONTH' ? (
                        <DatePickerBodyMonths />
                    ) : gridMode === 'DAY' ? (
                        <DatePickerBodyDays />
                    ) : (
                        <></>
                    )}
                </div>
                <div>{dateInfos}</div>
                <div>{gridMode}</div>
                <div>{selectionMode}</div>
                <div>{internalDate?.toString()}</div>
                <div>
                    {JSON.stringify(
                        selection.reduce<number[]>((acc, item) => {
                            acc.push(item.ts)
                            return acc
                        }, [])
                    )}
                </div>
            </div>
        </DatePickerContext.Provider>
    )
}

export default DatePickerDrawer
