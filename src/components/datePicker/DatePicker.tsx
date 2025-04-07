import { Toggleable } from '../toggleable/Toggleable'
import { DatePickerOutputFormatType } from './core/DatePicker.types'
import { DatePickerSF } from './DatePicker.SF'

interface DatePickerProps {
    fieldName: string
    separator?: string
    inputFormat?: DatePickerOutputFormatType
    outputFormat?: DatePickerOutputFormatType
    displayFormat?: DatePickerOutputFormatType
}

const DatePicker = ({
    fieldName,
    separator = '-',
    inputFormat = 'yyyy/mm/dd',
    outputFormat = 'yyyy/mm/dd',
    displayFormat = 'yyyy/mm/dd'
}: DatePickerProps) => (
    <Toggleable>
        <DatePickerSF
            fieldName={fieldName}
            separator={separator}
            inputFormat={inputFormat}
            outputFormat={outputFormat}
            displayFormat={displayFormat}
        />
    </Toggleable>
)

export default DatePicker
