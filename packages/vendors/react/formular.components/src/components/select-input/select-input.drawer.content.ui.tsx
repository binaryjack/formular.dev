import { SlMagnifier } from 'react-icons/sl'

import DelayInput from '../delay-input/delay-input'

import { cx } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib'
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
    selectedItemSequenceId: number | null
    onFilterItems: (value: string) => void
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    width?: string
    height?: string
}

const SelectDrawerContentUI = ({
    items,
    handleKeyDown,
    onHandleSelectItem,
    selectedItemSequenceId,
    filterTriggerDelay,
    onFilterItems,
    onClearFilter,
    width,
    height
}: ISelectDrawerUIProps) => {
    const { toggleState } = useDrawerContext()

    return (
        <div
            className={cx('bg-white rounded shadow-lg p-3 overflow-hidden')}
            onKeyDown={handleKeyDown}
            style={{ width: width, height: height }}
        >
            <div className={cx('flex flex-row justify-center items-center w-full mt-1 mb-1')}>
                <i
                    className={cx('flex items-center justify-center mr-1 h-6 text-secondary-500')}
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
                    classNames="w-full px-3 py-2 border border-secondary-200 rounded focus:border-primary-500 focus:outline-none"
                    delay={filterTriggerDelay}
                    onChangeCallback={onFilterItems}
                    onClearCallback={onClearFilter}
                />
            </div>

            <SelectDrawerOptions
                options={items}
                onHandleSelectItem={onHandleSelectItem}
                selectedItemSequenceId={selectedItemSequenceId}
            />
        </div>
    )
}
export default SelectDrawerContentUI
