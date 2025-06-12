import { DatePickerDisplayType, DatePickerGridModeType, DatePickerSelectionModeType } from '../core/date-picker.types';
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models';
export interface IDatePickerContext {
    selectionMode: DatePickerSelectionModeType;
    gridMode: DatePickerDisplayType;
    internalDate: Date;
    gridData: IDatePickerRow[];
    selectedCells: IDatePickerCell[];
    updateInternalDate: (date: Date) => void;
    updateSelectedCells: (cells: IDatePickerCell[]) => void;
    updateGridMode: (gridMode: DatePickerGridModeType) => void;
    next: (forceGridMode?: DatePickerGridModeType) => void;
    previous: (forceGridMode?: DatePickerGridModeType) => void;
    jumpToNow: () => void;
    jumpToSelection: () => void;
    clear: () => void;
    close: () => void;
}
export declare const datePickerContextDefault: IDatePickerContext;
declare const DatePickerContext: import('react').Context<IDatePickerContext>;
declare const useDatePickerContext: () => IDatePickerContext;
export { DatePickerContext, useDatePickerContext };
