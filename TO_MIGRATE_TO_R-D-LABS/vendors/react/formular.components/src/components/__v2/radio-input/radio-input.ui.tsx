import type { IOptionItem } from 'formular.dev.lib'
import { FieldSet } from '../field-set/field-set.ui'
import { Label } from '../label/label.ui'
import { RadioOptionGroup } from './group/radio-option-group.ui'
import { IRadioInputProps } from './radio-input.types'

export const RadioInput = ({
    id,
    variants,
    mainLabelVariants,
    options,
    layout,
    layoutSet
}: IRadioInputProps) => {
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
                    className={`grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2`}
                >
                    {options.map((option: IOptionItem, i: number) => (
                        <RadioOptionGroup
                            key={option.id}
                            radioOptionProps={{
                                id: option.id,
                                'data-sequence-id': i,
                                tabIndex: 0,
                                name: `radio-${id}`,
                                initialState: option.selected,
                                variants: variants
                            }}
                            labelProps={{
                                htmlFor: option.id,
                                text: option.text,
                                variants: variants,
                                className: 'cursor-pointer select-none'
                            }}
                            className="mr-2"
                        />
                    ))}
                </div>
            }
            buttons={undefined}
        />
    )
}
