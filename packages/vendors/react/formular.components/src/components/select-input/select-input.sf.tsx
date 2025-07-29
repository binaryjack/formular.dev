import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'

import { cx } from 'formular.design.system'
import { ISelectBaseInput, isMissing, MissingPropEnum } from 'formular.dev.lib'
import { useMemo } from 'react'

import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import ValidationResultComponent from '../validation-result/validation-result'
import SelectDrawerContent from './select-input.drawer.content'

interface ISelectProps {
    fieldName: string
}

export const SelectSF = ({ fieldName }: ISelectProps) => {
    const { formInstance } = useFormularContext()
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

    useFieldDefaultValue(instance)

    const defaultValue = useMemo(() => {
        if (instance?.input?.value) {
            return instance?.input?.value
        }
        return instance?.input?.defaultValue
    }, [instance?.input?.value, instance?.input?.defaultValue])

    console.log('SelectSF render - field data:', {
        fieldName,
        instance: instance?.input?.name,
        optionsLength: instance?.optionBase?.options?.length,
        options: instance?.optionBase?.options,
        selectedOptionId: instance?.optionBase?.selectedOptionId,
        fieldType: instance?.input?.type,
        flags
    })

    return (
        <FieldSet
            id={instance?.input?.id ?? isMissing(MissingPropEnum.ID, SelectSF.name)}
            name={instance?.input?.name ?? isMissing(MissingPropEnum.NAME, SelectSF.name)}
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
                    items={instance?.optionBase?.options ?? []}
                    onSelectItem={(value) =>
                        (instance as unknown as ISelectBaseInput)?.onSelectItem(value)
                    }
                    selectedItemSequenceId={instance?.optionBase?.selectedOptionId ?? null}
                    //   defaultSelectedItem={defaultValue}
                />
            }
            itemsDrawerHeight="350px"
            itemsDrawerWidth="250px"
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
            onClear={() => (instance as unknown as ISelectBaseInput)?.clear()}
        >
            <input
                tabIndex={0}
                data-class="base-input"
                className={cx('w-full outline-none p-2 border-0')}
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                autoComplete="off"
                onKeyDownCapture={handleKeyDown}
            />
        </FieldSet>
    )
}
