import type { IOptionItem, ToggleableStateType } from 'formular.dev.lib'
import { useState } from 'react'

import useKeyBindings from './use-key-bindings'

export const useSequenceIdKeyBinding = (
    options: IOptionItem[],
    toggleState: ToggleableStateType,
    onSelectedOption: (option: IOptionItem) => void,
    setToggleState?: (state?: ToggleableStateType) => void
) => {
    const [currentItemSequenceId, setCurrentItemSequenceId] = useState<number>(0)

    const selectNextItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return

        if (currentItemSequenceId === options.length - 1) {
            setCurrentItemSequenceId(0)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId + 1)
    }

    const selectPreviousItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return
        if (currentItemSequenceId === 0) {
            setCurrentItemSequenceId(options.length - 1)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId - 1)
    }

    const onEnterSelect = (e: React.KeyboardEvent<any>) => {
        const selectedItem = options.find((o) => o.sequenceId === currentItemSequenceId)
        if (!selectedItem) return
        onSelectedOption?.(selectedItem)
        setToggleState?.('closed')
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

    return {
        currentItemSequenceId,
        handleKeyDown
    }
}
