import { forwardRef } from 'react'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { IDropdownItemProps } from './dropdown.types'

export const DropdownItem = forwardRef<HTMLDivElement, IDropdownItemProps>(
    (
        { option, toggleContextId, onSelectedOption, isHighlighted, tabIndex }: IDropdownItemProps,
        ref
    ) => {
        const { setToggleState } = useToggleableContext(toggleContextId)
        const handleOptionClick = () => {
            setToggleState('closed')
            onSelectedOption(option)
        }
        return (
            <div
                id={option.id}
                data-sequence-id={option.sequenceId}
                tabIndex={tabIndex}
                className={`
                    cursor-pointer 
                    select-none
                    hover:bg-gray-200
                     ${isHighlighted ? 'bg-gray-500' : ''}
                    p-2 rounded`}
                onClick={handleOptionClick}
                ref={ref}
            >
                {option.text}
            </div>
        )
    }
)
