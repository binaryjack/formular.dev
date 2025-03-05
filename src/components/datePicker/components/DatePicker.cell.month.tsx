import { IDatePickerCell } from '../../../field/datePickerBase/DatePicker.types'

interface IDatePickerCellMonthProps {
    cellItem: IDatePickerCell
}

const DatePickerCellMonth = ({ cellItem }: IDatePickerCellMonthProps) => {
    return <span> {cellItem?.item?.date?.dateObject.month}</span>
}

export default DatePickerCellMonth
