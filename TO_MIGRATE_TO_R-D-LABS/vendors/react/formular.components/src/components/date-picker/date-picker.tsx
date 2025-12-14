import { DateFormatsEnum } from 'formular.dev.lib'
import { memo } from 'react'

import useAppContext from '@components/context/app-context/app-context.context'

import { Toggleable } from '../toggleable/toggleable'
import { DatePickerSelectionModeType } from './core/date-picker.types'
import { DatePickerSF } from './date-picker.sf'

/**
 * Props for the DatePicker component.
 */
interface DatePickerProps {
    /** The name of the field as defined in the form schema */
    fieldName: string
    /** The separator used in the date format (default: '-') */
    separator?: string
    /** The format for storing the date data (default: 'yyyy/MM/dd') */
    dataFormat?: DateFormatsEnum
    /** The format for displaying the date to users (default: 'dd/MM/yyyy') */
    displayFormat?: DateFormatsEnum

    defaultSelectionMode?: DatePickerSelectionModeType
}

/**
 * A comprehensive date picker component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete date selection solution with:
 * - Interactive calendar interface with day, month, and year views
 * - Automatic field binding and date value management
 * - Customizable date formats for storage and display
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (arrow keys, shortcuts)
 * - Range selection support (single date or date ranges)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 * - Toggleable drawer interface for calendar display
 *
 * The component uses a sophisticated date picker interface with multiple view modes
 * and connects to the form instance via context, managing date state through
 * the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a date field name in your form's schema definition.
 * @param props.separator - Optional separator for date formatting (e.g., '/', '-', ' ')
 * @param props.dataFormat - Format used for storing date values internally
 * @param props.displayFormat - Format used for displaying dates to users
 *
 * @returns A rendered date picker field with calendar interface and validation
 *
 * @example
 * ```tsx
 * // Basic usage with default formats
 * <DatePicker fieldName="birthDate" />
 * ```
 *
 * @example
 * ```tsx
 * // With custom formats
 * <DatePicker
 *   fieldName="startDate"
 *   separator="/"
 *   dataFormat={DateFormatsEnum.YYYY_MM_DD}
 *   displayFormat={DateFormatsEnum.MM_DD_YYYY}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with validation
 * const schema = {
 *   properties: [
 *     DateBuilder.setId(1)
 *       .setName('eventDate')
 *       .setLabel('Event Date')
 *       .setValidationData(true, Validators.date('eventDate', true).build())
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <DatePicker fieldName="eventDate" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // European date format
 * <DatePicker
 *   fieldName="deliveryDate"
 *   separator="."
 *   displayFormat={DateFormatsEnum.DD_MM_YYYY}
 *   dataFormat={DateFormatsEnum.YYYY_MM_DD}
 * />
 * ```
 *
 * @remarks
 * - The fieldName must match a date field defined in your form schema
 * - The component provides an interactive calendar with day/month/year navigation
 * - Supports both single date selection and date range selection
 * - Uses the Toggleable wrapper for smooth calendar open/close animations
 * - Automatically detects separator from display format if not specified
 * - Supports keyboard navigation within the calendar interface
 * - Integrates with the form's submission and validation lifecycle
 * - The calendar interface includes "jump to now" and navigation features
 * - Provides locale-aware date formatting and display
 */
const DatePicker = memo(
    ({
        fieldName,
        separator,
        dataFormat = DateFormatsEnum.YYYY_MM_DD,
        displayFormat = DateFormatsEnum.DD_MM_YYYY,
        defaultSelectionMode = 'single',
        ...rest
    }: DatePickerProps) => {
        const { getConfiguration } = useAppContext()
        const defaultSeparator = getConfiguration<string | undefined>(
            'cultures',
            'defaultCulture',
            'separator'
        )

        const finalSeparator = separator ?? defaultSeparator
        if (!fieldName) {
            console.error('DatePicker: "fieldName" is required.')
            return null
        }

        const getDefaultSeparator = (format: DateFormatsEnum): string => {
            if (format.includes('/')) return '/'
            if (format.includes('-')) return '-'
            return ' '
        }

        const resolvedSeparator = finalSeparator ?? getDefaultSeparator(displayFormat)

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
                    defaultSelectionMode={defaultSelectionMode}
                    {...rest}
                />
            </Toggleable>
        )
    }
)

export default DatePicker
