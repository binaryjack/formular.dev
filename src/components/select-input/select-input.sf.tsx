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
            instance?.input?.clear()
        }
    })

    useFieldDefaultValue(instance?.input)

    return (
        <FieldSet
            inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                instance?.input?.focus()
            }}
            itemsChildren={
                <SelectDrawerContent
                    filterTriggerDelay={500}
                    items={instance?.input?.options ?? []}
                    onSelectItem={(value) => instance?.input?.onSelectItem(value)}
                    selectedItemSequenceId={instance?.input?.selectedOptionId ?? null}
                />
            }
            itemsDrawerHeight="350px"
            itemsDrawerWidth="250px"
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                {...instance?.input?.register()}
                ref={(r) => instance?.input?.ref(r)}
                value={instance?.input?.getSelectedValue?.()}
                autoComplete="off"
                onKeyDownCapture={handleKeyDown}
            />
        </FieldSet>
    )
}
