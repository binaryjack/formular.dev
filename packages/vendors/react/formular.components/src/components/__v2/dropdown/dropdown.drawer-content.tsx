import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { IOptionItem } from 'formular.dev.lib/types/formular-dev.es'
import { useEffect, useRef, useState } from 'react'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import { DropdownItem } from './dropdown.item'
import { IDropdownDrawerContent } from './dropdown.types'

export const DropdownDrawerContent = ({
    filteredOptions,
    toggleContextId,
    onSelectedOption
}: IDropdownDrawerContent) => {
    const { setToggleState, toggleState } = useToggleableContext(toggleContextId)
    const [currentItemSequenceId, setCurrentItemSequenceId] = useState<number>(0)
    const drawerContentRef = useRef<HTMLDivElement>(null)

    const onEnterSelect = (e: React.KeyboardEvent<any>) => {
        const selectedItem = filteredOptions.find((o) => o.sequenceId === currentItemSequenceId)
        if (!selectedItem) return
        onSelectedOption?.(selectedItem)
        setToggleState('closed')
    }

    const selectNextItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return

        if (currentItemSequenceId === filteredOptions.length - 1) {
            setCurrentItemSequenceId(0)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId + 1)
    }

    const selectPreviousItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return
        if (currentItemSequenceId === 0) {
            setCurrentItemSequenceId(filteredOptions.length - 1)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId - 1)
    }

    const { handleKeyDown } = useKeyBindings({
        onEscapeCallback: (e) => {
            setToggleState?.('closed')
        },
        onArrowUpCallback: (e) => {
            selectPreviousItem(e)
        },
        onArrowDownCallback: (e) => {
            selectNextItem(e)
        },
        onEnterCallback: (e) => {
            onEnterSelect(e)
        }
    })

    useEffect(() => {
        const element = drawerContentRef?.current as unknown as HTMLDivElement
        if (!element) return
        if (toggleState === 'open') element.focus()
    }, [toggleState])

    return (
        <div
            ref={drawerContentRef}
            className="p-2 focus:outline-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {filteredOptions.map((option: IOptionItem) => {
                return (
                    <DropdownItem
                        key={option.id}
                        option={option}
                        toggleContextId={toggleContextId}
                        isHighlighted={currentItemSequenceId === option.sequenceId}
                        onSelectedOption={onSelectedOption}
                    />
                )
            })}
        </div>
    )
}
