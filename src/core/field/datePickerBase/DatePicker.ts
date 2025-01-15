import { IDatePicker } from './DatePicker.types'

export const DatePickerBase = function (this: IDatePicker, id: string, name?: string) {
    this.name = name ?? `datePicker-${id}`
    this.id = id
    this.separator = '-'
    this.inputFormat = 'mm/dd/yyyy'
    this.outputFormat = 'mm/dd/yyyy'
    this.displayFormat = 'mm/dd/yyyy'
    this.internalHTMLElementRef = null
    this.internalCells = null
} as any as IDatePicker
