import useKeyBindings from '../../core/hooks/useKeyBindings'
import { INDate } from '../../dependency/schema/descriptor/field.data.date.struct'
import { conventions } from '../context/conventions/conventions'
import { DrawerOpenStateType } from '../drawer/Drawer.types'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../Formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { DatePickerOutputFormatType } from './core/DatePicker.types'
import { formatDate } from './core/DatePicker.utils'
import DatePickerContentDrawer from './DatePicker.drawer.content'

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

    const onSelectDate = (startDate?: INDate, endDate?: INDate) => {
        const sd = formatDate(startDate, displayFormat)

        let value = sd
        if (endDate) {
            value = `${value} => ${formatDate(endDate, displayFormat)}`
        }

        field?.setValue(value)
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
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </FieldSet>
    )
}

export default DatePicker
