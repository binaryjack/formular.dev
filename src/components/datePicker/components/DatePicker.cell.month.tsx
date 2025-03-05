import { IDatePickerCell } from '../core/models/DatePicker.models'

interface IDatePickerCellMonthProps {
    cellItem: IDatePickerCell
}

const DatePickerCellMonth = ({ cellItem }: IDatePickerCellMonthProps) => {
    return <span> {cellItem?.item?.date?.dateObject.month}</span>
}

export default DatePickerCellMonth
