import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'
import { useState } from 'react'
import { CheckboxInput } from '../checkbox-input/checkbox-input.ui'
import { FieldSet } from '../field-set/field-set.ui'
import { Label } from '../label/label.ui'
import { ICheckGroupInput } from './check-group-input.types'

export const CheckGroupInput = ({
    id,
    options,
    onSelectOptions,
    mainLabelVariants,
    variants,
    layout,
    layoutSet,
    ...rest
}: ICheckGroupInput) => {
    const [selectedOptions, setSelectedOptions] = useState<IOptionItem[]>([])
    const handleOnSelected = (selected: IOptionItem) => {
        if (selectedOptions.find((option) => option.id === selected.id)) {
            setSelectedOptions(selectedOptions.filter((option) => option.id !== selected.id))
        } else {
            setSelectedOptions([...selectedOptions, selected])
        }
        onSelectOptions?.(selectedOptions)
    }

    const orientation = options.length > 3 ? 'flex-col' : ' flex-col xs:flex-row sm:flex-row'
    return (
        <FieldSet
            layout={layout}
            layoutSet={layoutSet}
            label={
                <Label
                    htmlFor={id}
                    text={id}
                    variants={mainLabelVariants}
                    className="cursor-pointer select-none"
                />
            }
            input={
                <div
                    id={id}
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1`}
                    {...rest}
                >
                    {options.map((option: IOptionItem, i: number) => (
                        <CheckboxInput
                            key={`ci-${option.id}`}
                            id={`ci-${option.id}`}
                            label={option.text}
                            tabIndex={0}
                            onSelect={() => handleOnSelected(option)}
                            size={1}
                            className={'bg-blue-100'}
                            autoComplete="off"
                            initialState={undefined}
                        />
                    ))}
                </div>
            }
            buttons={undefined}
        />
    )
}
