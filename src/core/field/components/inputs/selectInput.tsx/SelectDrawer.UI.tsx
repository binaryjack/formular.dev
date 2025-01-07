import { SlMagnifier } from 'react-icons/sl'

import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'
import DelayInput from '../delayInput/DelayInput'
import SelecteDrawerOption from './SelectDrawer.option'

interface ISelectDrawerUIProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType

    filterTriggerDelay: number
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void

    onFilterItems: (value: string) => void
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectDrawerUI = ({
    items,
    drawerOpenState,
    handleKeyDown,
    onHandleSelectItem,
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

                {items.map((item, index) => {
                    return (
                        <SelecteDrawerOption
                            key={item.id}
                            option={item}
                            isSelected={item.id === index.toString()}
                            onHandleSelectItem={onHandleSelectItem}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default SelectDrawerUI
