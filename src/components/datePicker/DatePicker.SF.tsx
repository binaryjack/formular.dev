import { useEffect } from 'react'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { conventions } from '../context/conventions/conventions'

import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import { useToggleableContext } from '../toggleable/Toggleable.context.hook'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { DatePickerOutputFormatType } from './core/DatePicker.types'

import DatePickerContentDrawer from './DatePicker.drawer.content'
import { formatDate } from './core/formatters/formatDate'

interface DatePickerSFProps {
    fieldName: string
    defaultDate?: string
    separator?: string
    dataFormat?: DatePickerOutputFormatType
    displayFormat?: DatePickerOutputFormatType
}

export const DatePickerSF = ({
    fieldName,
    defaultDate,
    separator = '-',
    dataFormat = 'yyyy/mm/dd',
    displayFormat = 'dd/mm/yyyy'
}: DatePickerSFProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        field?.setValue(value)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            setToggleState('open')
        },
        onDeleteCallback: () => {
            field?.clear()
        }
    })
    useEffect(() => {
        console.log('FIELD HAS VALUE: ', field?.defaultValue)
    }, [field?.defaultValue])

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                field?.focus()
            }}
            itemsChildren={
                <DatePickerContentDrawer
                    id={field?.name ?? 'NOT-DEFINED!'}
                    onSelectDate={onSelectDate}
                    separator={separator}
                    dataFormat={dataFormat}
                    displayFormat={displayFormat}
                    defaultDate={field?.defaultValue as string}
                />
            }
            itemsDrawerHeight="350px"
            itemsDrawerWidth="250px"
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...field?.register()}
                ref={field?.ref()}
                autoComplete="off"
                onKeyDown={handleKeyDown}
            />
        </FieldSet>
    )
}
