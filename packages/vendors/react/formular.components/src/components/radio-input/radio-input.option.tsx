import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { IOptionItem, IRadioBaseInput } from 'formular.dev.lib'

interface IRadioInputOptionProps {
    field: IRadioBaseInput
    option: IOptionItem
}

const RadioInputOption = ({ field, option }: IRadioInputOptionProps) => {
    const handleDelete = () => {
        field?.input.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    return (
        <div className={`radio-item-group`}>
            <input
                tabIndex={0}
                data-sequence-id={option.sequenceId}
                data-class="base-radio"
                className="base-radio "
                type="radio"
                name={field.input.name}
                value={option.value}
                {...field?.registerOption(option)}
                ref={(r) => r && field?.refOption(r)}
                onKeyDown={handleKeyDown}
            />
            <label
                htmlFor={`option-${option.id}`}
                className={`ml-2 cursor-pointer select-none`}
                {...field?.registerLabel(option)}
            >
                {option.text}
            </label>
        </div>
    )
}

export default RadioInputOption
