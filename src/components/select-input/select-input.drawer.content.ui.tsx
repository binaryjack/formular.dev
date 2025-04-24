import { SlMagnifier } from 'react-icons/sl'

import { IOptionItem } from '../../dependency/schema/options-schema/options.scheme.types'
import DelayInput from '../delay-input/delay-input'

import { useDrawerContext } from '../drawer/components/drawer.context'
import SelectDrawerOptions from './select-input.drawer.options'

interface ISelectDrawerUIProps {
    items: IOptionItem[]

    filterTriggerDelay: number
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
    selectedItemId: string
    onFilterItems: (value: string) => void
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    width?: string
    height?: string
}

const SelectDrawerContentUI = ({
    items,
    handleKeyDown,
    onHandleSelectItem,
    selectedItemId,
    filterTriggerDelay,
    onFilterItems,
    onClearFilter,
    width,
    height
}: ISelectDrawerUIProps) => {
    const { toggleState } = useDrawerContext()

    return (
        <div
            className={`select-container overflow-hidden`}
            onKeyDown={handleKeyDown}
            style={{ width: width, height: height }}
        >
            <div className={` flex flex-row justify-center items-center w-full mt-1 mb-1 `}>
                <i
                    className={`flex icon-box mr-1 h-6`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <SlMagnifier />
                </i>
                <DelayInput
                    tabIndex={0}
                    canGotFocus={toggleState === 'open'}
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
    )
}
export default SelectDrawerContentUI
