import { cx } from 'formular.design.system'

import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'
import { Label } from '../label/label.ui'
import { RadioOptionGroup } from './group/radio-option-group.ui'
import { IRadioInputProps } from './radio-input.types'

export const RadioInput = ({ id, variants, options }: IRadioInputProps) => {
    return (
        <div id={id} className={cx('radio-input', 'flex flex-col space-y-1')}>
            <Label htmlFor={id} text={id} />
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
                />
            ))}
        </div>
    )
}
