import { IDatePickerCell } from '../core/models/DatePicker.models'

interface IDatePickerCellYearProps {
    cellItem: IDatePickerCell
}

const DatePickerCellYear = ({ cellItem }: IDatePickerCellYearProps) => {
    return <span> {cellItem?.item?.date?.dateObject.month}</span>
}

export default DatePickerCellYear
