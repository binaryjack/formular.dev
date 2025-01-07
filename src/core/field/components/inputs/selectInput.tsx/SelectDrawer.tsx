import { useEffect, useState } from 'react'

import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'
import useKeyBindings from '../../../../hooks/useKeyBindings'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'
import SelectDrawerUI from './SelectDrawer.UI'

interface ISelectDrawerProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType
    filterTriggerDelay: number
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
    onSetOpenState,
    onSelectItem
}: ISelectDrawerProps) => {
    console.log('SelectDrawer', drawerOpenState)
    const [filteredItems, setFilteredItems] = useState<IOptionItem[]>(items)

    const handleSelectItem = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        item: IOptionItem
    ) => {
        e.stopPropagation()
        e.preventDefault()
        onSelectItem(item)
        onSetOpenState(e, 'closed')
    }

    const handleFilterItems = (value: string): void => {
        console.log('FILTER', value)
        const newCollection = items.filter((item) =>
            item.text.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        )
        setFilteredItems(newCollection)
    }

    const handleClearFilter = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e?.preventDefault?.()
        setFilteredItems(items)
    }

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    const { handleKeyDown } = useKeyBindings({
        onEscapeCallback: () => {
            onSetOpenState({} as any, 'closed')
        }
    })

    return (
        <SelectDrawerUI
            filterTriggerDelay={filterTriggerDelay}
            items={filteredItems}
            handleKeyDown={handleKeyDown}
            drawerOpenState={drawerOpenState}
            onHandleSelectItem={handleSelectItem}
            onFilterItems={handleFilterItems}
            onClearFilter={handleClearFilter}
        />
    )
}
export default SelectDrawer
