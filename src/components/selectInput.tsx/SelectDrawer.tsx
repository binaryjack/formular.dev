import { useEffect, useRef, useState } from 'react'

import { DrawerOpenStateType } from '../../core/base/drawer/Drawer.types'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { IOptionItem } from '../../dependency/schema/optionsSchema/options.scheme.types'
import SelectDrawerUI from './SelectDrawer.UI'

interface ISelectDrawerProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType
    filterTriggerDelay: number
    selectedItemId?: number
    onSetOpenState: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    onSelectItem: (value: IOptionItem) => void
}

const SelectDrawer = ({
    items,
    filterTriggerDelay,
    drawerOpenState,
    selectedItemId,
    onSetOpenState,
    onSelectItem
}: ISelectDrawerProps) => {
    const [filteredItems, setFilteredItems] = useState<IOptionItem[]>(items)
    const [currentItemId, setCurrentItemId] = useState<number>(selectedItemId ? selectedItemId : 0)
    const originalSelectedItemRef = useRef<number>(selectedItemId ? selectedItemId : 0)
    const handleSelectItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: IOptionItem
    ) => {
        e.stopPropagation()
        e.preventDefault()
        onSelectItem(item)
        onSetOpenState(e, 'closed')
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
        if (drawerOpenState === 'closed') return
        if (currentItemId === items.length - 1) {
            setCurrentItemId(0)
            return
        }
        setCurrentItemId(currentItemId + 1)
    }

    const selectPreviousItem = () => {
        if (drawerOpenState === 'closed') return
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
            onSetOpenState({} as any, 'closed')
        }
    }

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    const { handleKeyDown } = useKeyBindings({
        onEscapeCallback: () => {
            onSetOpenState({} as any, 'closed')
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
        <SelectDrawerUI
            filterTriggerDelay={filterTriggerDelay}
            items={filteredItems}
            handleKeyDown={handleKeyDown}
            drawerOpenState={drawerOpenState}
            selectedItemId={currentItemId}
            onHandleSelectItem={handleSelectItem}
            onFilterItems={handleFilterItems}
            onClearFilter={handleClearFilter}
        />
    )
}
export default SelectDrawer
