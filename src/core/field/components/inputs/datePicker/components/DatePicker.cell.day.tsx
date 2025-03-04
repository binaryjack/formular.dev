import { IDatePickerCell } from '../../../../datePickerBase/DatePicker.types'

interface IDatePickerCellDayProps {
    cellItem: IDatePickerCell
}

const DatePickerCellDay = ({ cellItem }: IDatePickerCellDayProps) => {
    return <span> {cellItem.id}</span>
}

export default DatePickerCellDay
