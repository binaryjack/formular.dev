import { IDateObject } from './date-object.models';
import { IDatePickerCell, IDatePickerItem, IDatePickerOptions } from './date-picker.models';
export declare const newDatePickerItem: (id: string, date: IDateObject, option: Partial<IDatePickerOptions>) => {
    id: string;
    date: IDateObject;
    selected: boolean;
    active: boolean;
    isNextScope: boolean;
    isPreviousScope: boolean;
    isCurrentScope: boolean;
    isRangeDays: boolean;
    isWeekEnd: boolean;
    isNow: boolean;
    displayType: import('../date-picker.types').DatePickerDisplayType;
};
export declare const newCell: (id: number, item: IDatePickerItem | null) => IDatePickerCell;
export declare const newCellsRow: (id: number, cells: IDatePickerCell[]) => {
    id: number;
    cells: IDatePickerCell[];
};
