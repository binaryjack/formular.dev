import { memo } from 'react'
import { Toggleable } from '../toggleable/toggleable'
import { DatePickerFormatsEnum } from './core/date-picker.types'
import { DatePickerSF } from './date-picker.sf'

interface DatePickerProps {
    fieldName: string
    separator?: string
    dataFormat?: DatePickerFormatsEnum
    displayFormat?: DatePickerFormatsEnum
}
/**
 * A reusable DatePicker component with customizable formats and separators.
 *
 * @param {string} fieldName - The name of the field associated with the DatePicker.
 * @param {string} [separator='-'] - The separator used in the date format.
 * @param {DatePickerFormats} [dataFormat='yyyy/mm/dd'] - The format for storing the date.
 * @param {DatePickerFormats} [displayFormat='dd/mm/yyyy'] - The format for displaying the date.
 */
const DatePicker = memo(
    ({
        fieldName,
        separator = '-',
        dataFormat = DatePickerFormatsEnum.YYYY_MM_DD,
        displayFormat = DatePickerFormatsEnum.DD_MM_YYYY,
        ...rest
    }: DatePickerProps) => {
        if (!fieldName) {
            console.error('DatePicker: "fieldName" is required.')
            return null
        }

        const getDefaultSeparator = (format: DatePickerFormatsEnum): string => {
            if (format.includes('/')) return '/'
            if (format.includes('-')) return '-'
            return ' '
        }

        const resolvedSeparator = separator || getDefaultSeparator(displayFormat)

        return (
            /**
             * The `Toggleable` wrapper provides toggling behavior for the DatePicker,
             * allowing it to open and close dynamically based on user interaction.
             */
            <Toggleable>
                <DatePickerSF
                    fieldName={fieldName}
                    separator={resolvedSeparator}
                    dataFormat={dataFormat}
                    displayFormat={displayFormat}
                    aria-label="Date Picker"
                    {...rest}
                />
            </Toggleable>
        )
    }
)

export default DatePicker
