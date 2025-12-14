import { cx } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib'
import SelectDrawerOption from './select-input.drawer.option'

interface ISelectDrawerOptionsProps {
    options: IOptionItem[]
    selectedItemSequenceId: number | null
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
}

const SelectDrawerOptions = ({
    options,
    selectedItemSequenceId,
    onHandleSelectItem
}: ISelectDrawerOptionsProps) => {
    return (
        <div className={cx('space-y-1 max-h-60 overflow-y-auto')}>
            {options.map((option: IOptionItem) => {
                return (
                    <SelectDrawerOption
                        key={option.id}
                        option={option}
                        isSelected={option.sequenceId === selectedItemSequenceId}
                        onHandleSelectItem={onHandleSelectItem}
                    />
                )
            })}
        </div>
    )
}

export default SelectDrawerOptions
