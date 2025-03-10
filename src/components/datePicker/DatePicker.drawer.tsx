import { useCallback, useEffect, useState } from 'react'
import { BsCalendar3, BsCalendar3Event, BsCalendar3Range, BsCalendarDate } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'

import { DrawerOpenStateType } from '../../core/base/drawer/Drawer.types'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import DatePickerBodyDays from './components/DatePicker.body.days'
import DatePickerBodyMonths from './components/DatePicker.body.months'
import DatePickerBodyYears from './components/DatePicker.body.years'
import { DatePickerContext, IDatePickerContext } from './components/DatePicker.context'
import DatePickerDrawerHeader from './components/DatePicker.header'
import { DatePickerGridModeType, DatePickerSelectionModeType } from './core/DatePicker.types'
import {
    computeDaysGrid,
    computeMonthsGrid,
    computeYearsGrid,
    getNextDate,
    getPreviousDate
} from './core/DatePicker.utils'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'

interface IDatePickerDrawerProps {
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    defaultDate?: INDate | Date
    onSelectDate: (startDate?: INDate, endDate?: INDate) => void
    defaultSelectionMode?: DatePickerSelectionModeType
    defaultGridMode?: DatePickerGridModeType
    showFooter?: boolean
}

const DatePickerDrawer = ({
    drawerOpenState,
    defaultDate,
    onSetOpenState,
    onSelectDate,
    showFooter,
    defaultSelectionMode = 'single',
    defaultGridMode = 'DAY'
}: IDatePickerDrawerProps) => {
    const [gridMode, setGridMode] = useState<DatePickerGridModeType>(defaultGridMode)
    const [selectionMode, setSelectionMode] =
        useState<DatePickerSelectionModeType>(defaultSelectionMode)
    const [gridData, setGridData] = useState<IDatePickerRow[]>([])
    const [selection, setSelection] = useState<IDatePickerCell[]>([])
    const [internalDate, setInternalDate] = useState<Date>()

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

    const getSelectedDateNumbers = (): number[] => {
        return selection.reduce<number[]>((acc, item) => {
            acc.push(item.ts)
            return acc
        }, [])
    }

    const datePickerContextDefault: IDatePickerContext = {
        selectionMode: selectionMode,
        internalDate: internalDate ?? new Date(),
        gridData: gridData,
        selectedCells: selection,
        updateInternalDate: (newDate: Date) => setInternalDate(newDate),
        updateSelectedCells: (cells: IDatePickerCell[]) => setSelection(cells),
        updateGridMode: (gridMode: DatePickerGridModeType) => setGridMode(gridMode),
        next: (forceGridMode?: DatePickerGridModeType) => {
            setInternalDate(getNextDate(forceGridMode ?? gridMode, internalDate ?? new Date()))
        },
        previous: (forceGridMode?: DatePickerGridModeType) => {
            setInternalDate(getPreviousDate(forceGridMode ?? gridMode, internalDate ?? new Date()))
        },
        resetTo: resetTo,
        clear: () => setSelection([]),
        close: () => {}
    }

    return (
        <DatePickerContext.Provider value={datePickerContextDefault}>
            <div className={`date-picker-drawer`} onClick={handleOnClick}>
                <DatePickerDrawerHeader />

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

                {showFooter ? (
                    <div className={`date-picker-footer`}>
                        <div className={`grid-mode`}>
                            <div>grid mode: </div>
                            <div>
                                {gridMode === 'DAY' ? (
                                    <BsCalendarDate title={`day`} />
                                ) : gridMode === 'MONTH' ? (
                                    <BsCalendar3 title={`month`} />
                                ) : (
                                    <TbWorld title={`year`} />
                                )}
                            </div>
                        </div>

                        <div className={`grid-mode`}>
                            <div>selection mode: </div>
                            <div>
                                {selectionMode === 'range' ? (
                                    <BsCalendar3Range title={`range`} />
                                ) : (
                                    <BsCalendar3Event title={`single`} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </DatePickerContext.Provider>
    )
}

export default DatePickerDrawer
