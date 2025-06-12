import { INDate } from '@core/framework/schema/descriptor/i-n-date'

import { conventions, MissingPropEnum } from '../context/conventions/conventions'

import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'

import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { customEvent } from '@core/input-engine/core/abstract/dom-registers-builder'
import { useMemo } from 'react'
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
    separator = conventions.dataTypes.date.separator,
    dataFormat = conventions.dataTypes.date.formatValue,
    displayFormat = conventions.dataTypes.date.formatDisplay
}: DatePickerSFProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        instance?.input?.valueManager?.setValue(instance, startDate)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            setToggleState('open')
        },
        onEnterCallback: (e) => {
            e.stopPropagation()
            e.preventDefault()
            setToggleState('open')
        },
        onDeleteCallback: () => {
            instance?.input?.clear()
        }
    })

    useFieldDefaultValue(instance)

    const defaultValue = useMemo(() => {
        if (instance?.input?.value) {
            return instance?.input?.value
        }
        return instance?.input?.defaultValue
    }, [instance?.input?.value, instance?.input?.defaultValue])

    return (
        <FieldSet
            inputId={
                instance?.input?.name ??
                conventions.IsMissing(MissingPropEnum.ID, DatePickerSF.name)
            }
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                // instance?.input?.focus()
            }}
            itemsChildren={
                <DatePickerContentDrawer
                    id={
                        instance?.input?.name ??
                        conventions.IsMissing(MissingPropEnum.NAME, DatePickerSF.name)
                    }
                    onSelectDate={onSelectDate}
                    /** this only acts from the drawer */
                    onClearField={() => instance?.input?.clear()}
                    separator={separator}
                    dataFormat={dataFormat}
                    displayFormat={displayFormat}
                    defaultDate={defaultValue as string}
                />
            }
            itemsDrawerHeight={conventions.components.drawer.height}
            itemsDrawerWidth={conventions.components.drawer.width}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={flags.focus}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.register(customEvent('onKeyDown', handleKeyDown as any))}
                ref={(r) => instance?.ref(r)}
                autoComplete="off"
                data-separator={separator}
                date-format={dataFormat}
                display-format={displayFormat}
            />
        </FieldSet>
    )
}
