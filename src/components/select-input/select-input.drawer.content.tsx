import { useEffect, useRef, useState } from 'react'

import useKeyBindings from '../../core/hooks/use-key-bindings'
import { IOptionItem } from '../../dependency/schema/options-schema/options.scheme.types'

import { useDrawerContext } from '../drawer/components/drawer.context'
import SelectDrawerContentUI from './select-input.drawer.content.ui'

interface ISelectDrawerProps {
    items: IOptionItem[]
    filterTriggerDelay: number
    selectedItemId?: string | null
    onSelectItem: (value: IOptionItem) => void
    width?: string
    height?: string
}

const SelectDrawerContent = ({
    items,
    filterTriggerDelay,
    selectedItemId,
    onSelectItem,
    width,
    height
}: ISelectDrawerProps) => {
    const [filteredItems, setFilteredItems] = useState<IOptionItem[]>(items)
    const [currentItemId, setCurrentItemId] = useState<string | null>(selectedItemId ?? null)
    const originalSelectedItemRef = useRef<number>(selectedItemId ?? 0)

    const { drawerHeight, drawerWidth, toggleState, setOpenState } = useDrawerContext()

    const handleSelectItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: IOptionItem
    ) => {
        e.stopPropagation()
        e.preventDefault()
        onSelectItem(item)
        setOpenState?.(e, 'closed')
        setCurrentItemId(Number(item.id))
    }

    const handleFilterItems = (value: string): void => {
        originalSelectedItemRef.current = currentItemId
        const newCollection = items.filter((item) =>
            item.text.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
        setFilteredItems(newCollection)
    }

    const handleClearFilter = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e?.preventDefault?.()
        setFilteredItems(items)
        setCurrentItemId(originalSelectedItemRef.current)
    }

    const selectNextItem = () => {
        if (toggleState === 'closed') return
        if (currentItemId === items.length - 1) {
            setCurrentItemId(0)
            return
        }
        setCurrentItemId(currentItemId + 1)
    }

    const selectPreviousItem = () => {
        if (toggleState === 'closed') return
        if (currentItemId === 0) {
            setCurrentItemId(items.length - 1)
            return
        }
        setCurrentItemId(currentItemId - 1)
    }

    const selectOnEnter = () => {
        const selectedItem = items.find((item) => item.id === currentItemId.toString())
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
            selectedItemId={currentItemId}
            onHandleSelectItem={handleSelectItem}
            onFilterItems={handleFilterItems}
            onClearFilter={handleClearFilter}
            width={drawerWidth ?? width}
            height={drawerHeight ?? height}
        />
    )
}
export default SelectDrawerContent
