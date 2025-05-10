import { INDate } from '@core/framework/schema/descriptor/field.data.date.struct'

import { conventions } from '../context/conventions/conventions'

import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'

import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { DatePickerFormatsEnum } from './core/date-picker.types'
import { formatDate } from './core/formatters/format-date'
import DatePickerContentDrawer from './date-picker.drawer.content'

interface DatePickerSFProps {
    fieldName: string
    separator?: string
    dataFormat?: DatePickerFormatsEnum
    displayFormat?: DatePickerFormatsEnum
}

export const DatePickerSF = ({
    fieldName,
    separator = '-',
    dataFormat = DatePickerFormatsEnum.YYYY_MM_DD,
    displayFormat = DatePickerFormatsEnum.DD_MM_YYYY
}: DatePickerSFProps) => {
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        instance?.field?.setValue(value)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            setToggleState('open')
        },
        onDeleteCallback: () => {
            instance?.field?.clear()
        }
    })

    useFieldDefaultValue(instance?.field)

    return (
        <FieldSet
            inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
            label={instance?.field?.label}
            type={instance?.field?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                instance?.field?.focus()
            }}
            itemsChildren={
                <DatePickerContentDrawer
                    id={instance?.field?.name ?? 'NOT-DEFINED!'}
                    onSelectDate={onSelectDate}
                    separator={separator}
                    dataFormat={dataFormat}
                    displayFormat={displayFormat}
                    defaultDate={instance?.field?.defaultValue as string}
                />
            }
            itemsDrawerHeight="350px"
            itemsDrawerWidth="250px"
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.field?.validationResults ?? []}
                />
            }
            onClear={() => instance?.field?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.field?.register()}
                ref={(r) => instance?.field?.ref(r)}
                autoComplete="off"
                onKeyDown={handleKeyDown}
            />
        </FieldSet>
    )
}
