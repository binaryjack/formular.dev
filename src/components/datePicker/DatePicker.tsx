import { Toggleable } from '../toggleable/Toggleable'
import { DatePickerOutputFormatType } from './core/DatePicker.types'
import { DatePickerSF } from './DatePicker.SF'

interface DatePickerProps {
    fieldName: string
    separator?: string
    dataFormat?: DatePickerOutputFormatType
    displayFormat?: DatePickerOutputFormatType
}

const DatePicker = ({
    fieldName,
    separator = '-',
    dataFormat = 'yyyy/mm/dd',
    displayFormat = 'dd/mm/yyyy'
}: DatePickerProps) => (
    <Toggleable>
        <DatePickerSF
            fieldName={fieldName}
            separator={separator}
            dataFormat={dataFormat}
            displayFormat={displayFormat}
        />
    </Toggleable>
)

export default DatePicker
