import type { IOptionItem } from 'formular.dev.lib'
import { useEffect, useRef } from 'react'

import { useSequenceIdKeyBinding } from '@adapters/react/hooks/use-sequence-id-key-binding'

import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { DropdownItem } from './dropdown.item'
import { IDropdownDrawerContent } from './dropdown.types'

export const DropdownDrawerContent = ({
    filteredOptions,
    toggleContextId,
    onSelectedOption
}: IDropdownDrawerContent) => {
    const drawerContentRef = useRef<HTMLDivElement>(null)
    const { setToggleState, toggleState } = useToggleableContext(toggleContextId)
    const { currentItemSequenceId, handleKeyDown } = useSequenceIdKeyBinding(
        filteredOptions,
        toggleState,
        onSelectedOption,
        setToggleState
    )

    useEffect(() => {
        const element = drawerContentRef?.current as unknown as HTMLDivElement
        if (!element) return
        // if (toggleState === 'open') element.focus()
    }, [toggleState])

    const accessibility = toggleState === 'open' ? 0 : -1
    return (
        <div
            ref={drawerContentRef}
            className="p-2 focus:outline-none"
            tabIndex={accessibility}
            onKeyDown={handleKeyDown}
        >
            {filteredOptions.map((option: IOptionItem) => {
                return (
                    <DropdownItem
                        key={option.id}
                        option={option}
                        tabIndex={accessibility}
                        toggleContextId={toggleContextId}
                        isHighlighted={currentItemSequenceId === option.sequenceId}
                        onSelectedOption={onSelectedOption}
                    />
                )
            })}
        </div>
    )
}
