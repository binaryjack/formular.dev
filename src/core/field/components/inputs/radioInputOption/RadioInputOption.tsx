import { useRef } from 'react'

import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'
import { IFieldInput } from '../../../fieldInputBase/fieldInput.types'

interface IRadioInputOptionProps {
    field: IFieldInput
    option: IOptionItem
}

const RadioInputOption = ({ field, option }: IRadioInputOptionProps) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <div>
            <input
                id={option.id}
                data-class="base-radio "
                type="radio"
                name={field.name}
                value={option.value}
                {...field.registerOption()}
                ref={field.refOption(ref)}
            />
            <label htmlFor={option.id}>{option.text}</label>
        </div>
    )
}

export default RadioInputOption
