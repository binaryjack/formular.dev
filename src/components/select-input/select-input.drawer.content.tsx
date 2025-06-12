import { useEffect, useRef, useState } from 'react'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'

import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { useDrawerContext } from '../drawer/components/drawer.context'
import SelectDrawerContentUI from './select-input.drawer.content.ui'

interface ISelectDrawerProps {
    items: IOptionItem[]
    filterTriggerDelay: number
    selectedItemSequenceId: number | null
    onSelectItem: (value: IOptionItem) => void
    width?: string
    height?: string
    defaultSelectedItem?: IOptionItem
}

const SelectDrawerContent = ({
    items,
    filterTriggerDelay,
    selectedItemSequenceId,
    onSelectItem,
    width,
    height,
    defaultSelectedItem
}: ISelectDrawerProps) => {
    const [filteredItems, setFilteredItems] = useState<IOptionItem[]>(items)
    const [currentItemSequenceId, setCurrentItemSequenceId] = useState<number>(
        selectedItemSequenceId ?? 0
    )
    const originalSelectedItemRef = useRef<number>(
        selectedItemSequenceId ?? defaultSelectedItem?.sequenceId ?? 0
    )

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

    const selectNextItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return

        if (currentItemSequenceId === items.length - 1) {
            setCurrentItemSequenceId(0)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId + 1)
    }

    const selectPreviousItem = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
        if (toggleState === 'closed') return
        if (currentItemSequenceId === 0) {
            setCurrentItemSequenceId(items.length - 1)
            return
        }
        setCurrentItemSequenceId(currentItemSequenceId - 1)
    }

    const selectOnEnter = (e: React.KeyboardEvent<any>) => {
        e?.preventDefault?.()
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
        onEscapeCallback: (e) => {
            setOpenState?.({} as any, 'closed')
        },
        onArrowUpCallback: (e) => {
            selectPreviousItem(e)
        },
        onArrowDownCallback: (e) => {
            selectNextItem(e)
        },
        onEnterCallback: (e) => {
            selectOnEnter(e)
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
