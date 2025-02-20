import { INDate } from '../../../../../dependency/schema/descriptor/field.data.date.struct'
import useFormyContext, { useField } from '../../../../form/components/Formy/Formy.context'
import useKeyBindings from '../../../../hooks/useKeyBindings'
import { DatePickerOutputFormat } from '../../../datePickerBase/DatePicker.types'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'
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

    const onSelectDate = (value: INDate) => {}

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
