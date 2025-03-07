import { createContext, useContext } from 'react'

import { DatePickerGridModeType, DatePickerSelectionModeType } from '../core/DatePicker.types'
import { IDatePickerCell, IDatePickerRow } from '../core/models/DatePicker.models'

export interface IDatePickerContext {
    selectionMode: DatePickerSelectionModeType
    internalDate: Date
    gridData: IDatePickerRow[]
    selectedCells: IDatePickerCell[]
    updateInternalDate: (date: Date) => void
    updateSelectedCells: (cells: IDatePickerCell[]) => void
    updateGridMode: (gridMode: DatePickerGridModeType) => void
    next: (forceGridMode?: DatePickerGridModeType) => void
    previous: (forceGridMode?: DatePickerGridModeType) => void
}

export const datePickerContextDefault: IDatePickerContext = {
    selectionMode: 'single',
    internalDate: new Date(),
    gridData: [],
    selectedCells: [],
    updateInternalDate: () => {
        return
    },
    updateSelectedCells: () => {
        return
    },
    updateGridMode: () => {
        return
    },
    next: (forceGridMode?: DatePickerGridModeType) => {
        return
    },
    previous: (forceGridMode?: DatePickerGridModeType) => {
        return
    }
}

const DatePickerContext = createContext<IDatePickerContext>(datePickerContextDefault)

const useDatePickerContext = (): IDatePickerContext => {
    return useContext(DatePickerContext)
}

export { DatePickerContext, useDatePickerContext }
