import { IDatePickerCell } from '../core/models/DatePicker.models'

interface IDatePickerCellDayProps {
    cellItem: IDatePickerCell
}

const DatePickerCellDay = ({ cellItem }: IDatePickerCellDayProps) => {
    return <span> {cellItem.id}</span>
}

export default DatePickerCellDay
