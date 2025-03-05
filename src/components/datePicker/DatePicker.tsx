import useFormyContext, { useField } from '../../core/form/components/Formy/Formy.context'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerOutputFormat } from '../../field/datePickerBase/DatePicker.types'
import { formatDate } from '../../field/datePickerBase/DatePicker.utils'
import { DrawerOpenStateType } from '../../field/drawer/Drawer.types'
import FieldSet from '../fieldset/FieldSet'
import ValidationResultComponent from '../validationResult/ValidationResult'
import DatePickerDrawer from './DatePicker.drawer'

interface DatePickerProps {
    fieldName: string
    separator?: string
    inputFormat?: DatePickerOutputFormat
    outputFormat?: DatePickerOutputFormat
    displayFormat?: DatePickerOutputFormat
}

const DatePicker = ({
    fieldName,
    separator = '-',
    inputFormat = 'mm/dd/yyyy',
    outputFormat = 'mm/dd/yyyy',
    displayFormat = 'mm/dd/yyyy'
}: DatePickerProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

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
                <DatePickerDrawer
                    onSetOpenState={handleDrawerOpenState}
                    onSelectDate={onSelectDate}
                    // defaultDate={new Date(2025, 8, 1)}
                />
            }
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
            onSetOpenState={handleDrawerOpenState}
            drawerOpenState={field?.openState}
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
