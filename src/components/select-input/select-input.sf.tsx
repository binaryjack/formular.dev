import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'
import './select-input.css'
import SelectDrawerContent from './select-input.drawer.content'
interface ISelectProps {
    fieldName: string
}

export const SelectSF = ({ fieldName }: ISelectProps) => {
    const { formInstance } = useFormyContext()

    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { setToggleState } = useToggleableContext()

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
                <SelectDrawerContent
                    filterTriggerDelay={500}
                    items={instance?.field?.options ?? []}
                    onSelectItem={(value) => instance?.field?.onSelectItem(value)}
                    selectedItemSequenceId={instance?.field?.selectedOptionId ?? null}
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
                value={instance?.field?.getSelectedValue?.()}
                autoComplete="off"
                onKeyDownCapture={handleKeyDown}
            />
        </FieldSet>
    )
}
