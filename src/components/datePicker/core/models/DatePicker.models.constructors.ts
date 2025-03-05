import { IDateObject } from './DateObject.models'
import { IDatePickerCell, IDatePickerItem, IDatePickerOptions } from './DatePicker.models'

export const newDatePickerItem = (
    id: string,
    date: IDateObject,
    option: Partial<IDatePickerOptions>
) => {
    return {
        id,
        date,
        selected: option.selected ?? false,
        active: option.active ?? false,
        isNextMonth: option.isNextMonth ?? false,
        isPreviousMonth: option.isPreviousMonth ?? false,
        isCurrentMonth: option.isCurrentMonth ?? false,
        isRangeDays: option.isRangeDays ?? false,
        displayType: option.displayType ?? 'DAY'
    }
}

export const newCell = (id: number, item: IDatePickerItem | null): IDatePickerCell => {
    const dtePrint = `${item?.date.dateObject.year}${item?.date.dateObject.month.toString().padStart(2, '0')}${item?.date.dateObject.day.toString().padStart(2, '0')}`
    return {
        id,
        code: dtePrint,
        ts: parseInt(dtePrint),
        item
    }
}

export const newCellsRow = (id: number, cells: IDatePickerCell[]) => {
    return { id, cells }
}
