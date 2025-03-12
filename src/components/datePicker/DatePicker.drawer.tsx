import { useCallback, useEffect, useState } from 'react'

import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { useDrawerContext } from '../drawer/Drawer.context'
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
import DatePickerDrawerUI from './DatePicker.drawer.UI'

interface IDatePickerDrawerProps {
    defaultDate?: INDate | Date
    onSelectDate: (startDate?: INDate, endDate?: INDate) => void
    defaultSelectionMode?: DatePickerSelectionModeType
    defaultGridMode?: DatePickerGridModeType
    showFooter?: boolean
}

const DatePickerDrawer = ({
    defaultDate,
    onSelectDate,
    showFooter,
    defaultSelectionMode = 'single',
    defaultGridMode = 'DAY'
}: IDatePickerDrawerProps) => {
    const [gridMode, setGridMode] = useState<DatePickerGridModeType>(defaultGridMode)
    const [gridData, setGridData] = useState<IDatePickerRow[]>([])
    const [selection, setSelection] = useState<IDatePickerCell[]>([])
    const [internalDate, setInternalDate] = useState<Date>()

    const { drawerOpenState, onSetOpenState } = useDrawerContext()

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
    }

    const jumpToNow = () => {
        const daysData = new Date()
        setInternalDate(daysData)
    }

    const jumpToSelection = () => {
        if (selection.length === 0) return
        const daysData = selection[0].item?.date?.toDate?.()
        setInternalDate(daysData)
    }

    const updateGrid = useCallback(() => {
        if (!internalDate) return

        switch (gridMode) {
            case 'MONTH':
                setGridData(computeMonthsGrid(internalDate))
                break
            case 'YEAR':
                setGridData(computeYearsGrid(internalDate))
                break
            case 'DAY':
            default:
                setGridData(computeDaysGrid(internalDate))
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
        selectionMode: defaultSelectionMode,
        gridMode: gridMode,
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
        jumpToNow: jumpToNow,
        jumpToSelection: jumpToSelection,
        clear: () => setSelection([]),
        close: () => {}
    }

    return (
        <DatePickerContext.Provider value={datePickerContextDefault}>
            <DatePickerDrawerUI
                defaultSelectionMode={defaultSelectionMode}
                showFooter={showFooter}
                onClick={handleOnClick}
            />
        </DatePickerContext.Provider>
    )
}

export default DatePickerDrawer
