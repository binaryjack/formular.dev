import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'
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
    return (
        <FieldSet
            layout={layout}
            layoutSet={layoutSet}
            label={<Label htmlFor={id} text={id} variants={mainLabelVariants} />}
            input={
                <div className={`flex flex-col xs:flex-row sm:flex-row`}>
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
                                variants: variants
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
