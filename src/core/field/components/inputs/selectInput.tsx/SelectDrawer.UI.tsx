import { SlMagnifier } from 'react-icons/sl'

import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'
import DelayInput from '../delayInput/DelayInput'

interface ISelectDrawerUIProps {
    items: IOptionItem[]
    drawerOpenState?: DrawerOpenStateType

    filterTriggerDelay: number

    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void

    onFilterItems: (value: string) => void
    onClearFilter: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const SelectDrawerUI = ({
    items,
    drawerOpenState,
    onHandleSelectItem,
    filterTriggerDelay,
    onFilterItems,
    onClearFilter
}: ISelectDrawerUIProps) => {
    return (
        <div className={` mt-1 select-drawer ${drawerOpenState === 'open' ? 'open' : 'closed'}`}>
            <div className={`items-left`}>
                <div className={` flex flex-row justify-center items-center w-full mt-1 mb-1 `}>
                    <i className={`flex icon-box mr-1 h-6`}>
                        <SlMagnifier />
                    </i>
                    <DelayInput
                        classNames={`flex input-sm-p mr-1 w-full`}
                        delay={filterTriggerDelay}
                        onChangeCallback={onFilterItems}
                        onClearCallback={onClearFilter}
                    />
                </div>

                {items.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className={`select-item`}
                            onClick={(e) => onHandleSelectItem(e, item)}
                        >
                            {item.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default SelectDrawerUI
