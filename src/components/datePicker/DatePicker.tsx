import { useRef } from 'react'

import useKeyBindings from '../../core/hooks/useKeyBindings'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import Drawer from '../drawer/Drawer'
import { DrawerOpenStateType } from '../drawer/Drawer.types'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../Formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { DatePickerOutputFormatType } from './core/DatePicker.types'
import { formatDate } from './core/DatePicker.utils'
import DatePickerDrawer from './DatePicker.drawer'

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
}: DatePickerProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const fieldSet = useRef(null)
    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        if (!field) return

        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        field.setValue(value)
    }

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => {
        e?.stopPropagation?.()
        e?.preventDefault?.()
        field?.setOpenState(state)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            handleDrawerOpenState({} as any, 'open')
        },
        onDeleteCallback: () => {
            field?.clear()
        }
    })

    return (
        <FieldSet
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                field?.focus()
            }}
            itemsChildren={
                <Drawer
                    id={field?.name ?? 'NOT-DEFINED!'}
                    onSetOpenState={handleDrawerOpenState}
                    drawerOpenState={field?.openState}
                >
                    <DatePickerDrawer onSelectDate={onSelectDate} />
                </Drawer>
            }
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <input
                data-class="base-input"
                {...field?.register()}
                ref={field?.ref()}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </FieldSet>
    )
}

export default DatePicker
