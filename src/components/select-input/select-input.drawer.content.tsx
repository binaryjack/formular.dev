import { useEffect, useRef, useState } from 'react'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import useKeyBindings from '../../core/hooks/use-key-bindings'

import { useDrawerContext } from '../drawer/components/drawer.context'
import SelectDrawerContentUI from './select-input.drawer.content.ui'

interface ISelectDrawerProps {
    items: IOptionItem[]
    filterTriggerDelay: number
    selectedItemSequenceId: number | null
    onSelectItem: (value: IOptionItem) => void
    width?: string
    height?: string
}

const SelectDrawerContent = ({
    items,
    filterTriggerDelay,
    selectedItemSequenceId,
    onSelectItem,
    width,
    height
}: ISelectDrawerProps) => {
    const [filteredItems, setFilteredItems] = useState<IOptionItem[]>(items)
    const [currentItemSequenceId, setCurrentItemSequenceId] = useState<number>(
        selectedItemSequenceId ?? 0
    )
    const originalSelectedItemRef = useRef<number>(selectedItemSequenceId ?? 0)

    const { drawerHeight, drawerWidth, toggleState, setOpenState } = useDrawerContext()

    const handleSelectItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: IOptionItem
    ) => {
        e.stopPropagation()
        e.preventDefault()
        onSelectItem(item)
        setOpenState?.(e, 'closed')
        setCurrentItemSequenceId(item.sequenceId)
    }

    const handleFilterItems = (value: string): void => {
        originalSelectedItemRef.current = currentItemSequenceId
        const newCollection = items.filter((item) =>
            item.text.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
        setFilteredItems(newCollection)
    }

    const handleClearFilter = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e?.preventDefault?.()
        setFilteredItems(items)
        setCurrentItemSequenceId(originalSelectedItemRef.current)
    }

    const selectNextItem = () => {
        if (toggleState === 'closed') return

        if (currentItemSequenceId === items.length - 1) {
            setCurrentItemSequenceId(0)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId + 1)
    }

    const selectPreviousItem = () => {
        if (toggleState === 'closed') return
        if (currentItemSequenceId === 0) {
            setCurrentItemSequenceId(items.length - 1)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId - 1)
    }

    const selectOnEnter = () => {
        const selectedItem = items.find((item) => item.sequenceId === currentItemSequenceId)
        if (selectedItem) {
            onSelectItem(selectedItem)
            setOpenState?.({} as any, 'closed')
        }
    }

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    const { handleKeyDown } = useKeyBindings({
        onEscapeCallback: () => {
            setOpenState?.({} as any, 'closed')
        },
        onArrowUpCallback: () => {
            selectPreviousItem()
        },
        onArrowDownCallback: () => {
            selectNextItem()
        },
        onEnterCallback: () => {
            selectOnEnter()
        }
    })

    return (
        <SelectDrawerContentUI
            filterTriggerDelay={filterTriggerDelay}
            items={filteredItems}
            handleKeyDown={handleKeyDown}
            selectedItemSequenceId={currentItemSequenceId}
            onHandleSelectItem={handleSelectItem}
            onFilterItems={handleFilterItems}
            onClearFilter={handleClearFilter}
            width={drawerWidth ?? width}
            height={drawerHeight ?? height}
        />
    )
}
export default SelectDrawerContent
