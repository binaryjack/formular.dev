import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { cx } from 'formular.design.system'
import { IExtendedInput, IOptionItem } from 'formular.dev.lib'

// Create a more complete interface for radio inputs
interface IRadioInput extends IExtendedInput {
    registerOption: (option: IOptionItem) => any
    refOption: (ref: HTMLInputElement | null) => void
    registerLabel: (option: IOptionItem) => any
}

interface IRadioInputOptionProps {
    field: IRadioInput
    option: IOptionItem
}

const RadioInputOption = ({ field, option }: IRadioInputOptionProps) => {
    const handleDelete = () => {
        field?.input.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    return (
        <div className={cx('flex items-center py-1', 'radio-item-group')}>
            <input
                tabIndex={0}
                data-sequence-id={option.sequenceId}
                data-class="base-radio"
                className={cx(
                    'form-radio w-4 h-4',
                    'text-primary-600 border-secondary-300',
                    'focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50',
                    'transition duration-150 ease-in-out',
                    'base-radio'
                )}
                type="radio"
                name={field.input.name}
                value={option.value}
                {...field?.registerOption(option)}
                ref={(r) => r && field?.refOption(r)}
                onKeyDown={handleKeyDown}
            />
            <label
                htmlFor={`option-${option.id}`}
                className={cx('ml-2 cursor-pointer select-none', 'text-secondary-700 font-medium')}
                {...field?.registerLabel(option)}
            >
                {option.text}
            </label>
        </div>
    )
}

export default RadioInputOption
