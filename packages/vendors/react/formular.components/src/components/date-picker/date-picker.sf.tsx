import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'

import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'

import { useMemo } from 'react'

import useAppContext from '@components/context/app-context/app-context.context'
import {
    customEvent,
    DateFormatsEnum,
    formatDate,
    INDate,
    isMissing,
    MissingPropEnum
} from 'formular.dev.lib'
import { DatePickerSelectionModeType } from './core/date-picker.types'
import DatePickerContentDrawer from './date-picker.drawer.content'

interface DatePickerSFProps {
    fieldName: string
    separator?: string
    dataFormat?: DateFormatsEnum
    displayFormat?: DateFormatsEnum
    defaultSelectionMode?: DatePickerSelectionModeType
}

export const DatePickerSF = ({
    fieldName,
    separator,
    dataFormat,
    displayFormat,
    defaultSelectionMode = 'single'
}: DatePickerSFProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { getConfiguration } = useAppContext()
    const defaultSeparator = getConfiguration<string | undefined>(
        'conventions',
        'dataTypes',
        'date',
        'separator'
    )
    const defaultDataFormat = getConfiguration<DateFormatsEnum | undefined>(
        'conventions',
        'dataTypes',
        'date',
        'formatValue'
    )
    const defaultDisplayFormat = getConfiguration<DateFormatsEnum | undefined>(
        'conventions',
        'dataTypes',
        'date',
        'formatDisplay'
    )
    const drawerHeight = getConfiguration<string | undefined>(
        'conventions',
        'components',
        'drawer',
        'height'
    )
    const drawerWidth = getConfiguration<string | undefined>(
        'conventions',
        'components',
        'drawer',
        'width'
    )

    const finalSeparator = separator ?? defaultSeparator
    const finalDataFormat = dataFormat ?? defaultDataFormat
    const finalDisplayFormat = displayFormat ?? defaultDisplayFormat

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
            inputId={instance?.input?.name ?? isMissing(MissingPropEnum.ID, DatePickerSF.name)}
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
                    id={instance?.input?.name ?? isMissing(MissingPropEnum.NAME, DatePickerSF.name)}
                    onSelectDate={onSelectDate}
                    /** this only acts from the drawer */
                    onClearField={() => instance?.input?.clear()}
                    separator={finalSeparator}
                    dataFormat={finalDataFormat}
                    displayFormat={finalDisplayFormat}
                    defaultDate={defaultValue as string}
                    defaultSelectionMode={defaultSelectionMode}
                />
            }
            itemsDrawerHeight={drawerHeight}
            itemsDrawerWidth={drawerWidth}
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
                data-separator={finalSeparator}
                date-format={finalDataFormat}
                display-format={finalDisplayFormat}
            />
        </FieldSet>
    )
}
