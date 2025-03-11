import { SlMagnifier } from 'react-icons/sl'

import { DrawerOpenStateType } from '../../core/base/drawer/Drawer.types'
import { IOptionItem } from '../../dependency/schema/optionsSchema/options.scheme.types'
import DelayInput from '../delayInput/DelayInput'
import SelectDrawerOptions from './Select.drawer.options'

interface ISelectDrawerUIProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType

    filterTriggerDelay: number
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
    selectedItemId: number
    onFilterItems: (value: string) => void
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectDrawerUI = ({
    items,
    drawerOpenState,
    handleKeyDown,
    onHandleSelectItem,
    selectedItemId,
    filterTriggerDelay,
    onFilterItems,
    onClearFilter
}: ISelectDrawerUIProps) => {
    return (
        <div
            className={` mt-1 select-drawer ${drawerOpenState === 'open' ? 'open' : 'closed'}`}
            onKeyDown={handleKeyDown}
        >
            <div className={`items-left`}>
                <div className={` flex flex-row justify-center items-center w-full mt-1 mb-1 `}>
                    <i className={`flex icon-box mr-1 h-6`}>
                        <SlMagnifier />
                    </i>
                    <DelayInput
                        canGotFocus={drawerOpenState === 'open'}
                        classNames={`flex input-sm-p mr-1 w-full`}
                        delay={filterTriggerDelay}
                        onChangeCallback={onFilterItems}
                        onClearCallback={onClearFilter}
                    />
                </div>

                <SelectDrawerOptions
                    options={items}
                    onHandleSelectItem={onHandleSelectItem}
                    selectedItemId={selectedItemId}
                />
            </div>
        </div>
    )
}
export default SelectDrawerUI
