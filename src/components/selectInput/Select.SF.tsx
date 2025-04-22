import { useFieldDefaultValue } from '../../core/hooks/useFieldDefaultValue'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import { useToggleableContext } from '../toggleable/Toggleable.context.hook'
import ValidationResultComponent from '../validationResult/ValidationResult'
import SelectDrawerContent from './Select.drawer.content'

interface ISelectProps {
    fieldName: string
}

export const SelectSF = ({ fieldName }: ISelectProps) => {
    const { formInstance } = useFormyContext()

    const { field, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            setToggleState('open')
        },
        onDeleteCallback: () => {
            field?.clear()
        }
    })

    useFieldDefaultValue(field)

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
                <SelectDrawerContent
                    filterTriggerDelay={500}
                    items={field?.options ?? []}
                    onSelectItem={(value) => field?.onSelectItem(value)}
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
                ref={(r) => field?.ref(r)}
                value={field?.getSelectedValue?.()}
                autoComplete="off"
                onKeyDownCapture={handleKeyDown}
            />
        </FieldSet>
    )
}
