import { IDatePickerCell } from '../../../field/datePickerBase/DatePicker.types'

interface IDatePickerCellYearProps {
    cellItem: IDatePickerCell
}

const DatePickerCellYear = ({ cellItem }: IDatePickerCellYearProps) => {
    return <span> {cellItem?.item?.date?.dateObject.month}</span>
}

export default DatePickerCellYear
