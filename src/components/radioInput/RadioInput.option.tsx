import { useRef } from 'react'

import { IFieldInput } from '../../core/base/fieldInputBase/fieldInput.types'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { IOptionItem } from '../../dependency/schema/optionsSchema/options.scheme.types'

interface IRadioInputOptionProps {
    field: IFieldInput
    option: IOptionItem
}

const RadioInputOption = ({ field, option }: IRadioInputOptionProps) => {
    const ref = useRef<HTMLInputElement>(null)

    const handleDelete = () => {
        field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    return (
        <div className={`radio-item-group`}>
            <input
                id={option.id}
                className="base-radio "
                type="radio"
                name={field.name}
                value={option.value}
                {...field.registerOption()}
                ref={field.refOption(ref)}
                onKeyDown={handleKeyDown}
            />
            <label htmlFor={option.id}>{option.text}</label>
        </div>
    )
}

export default RadioInputOption
