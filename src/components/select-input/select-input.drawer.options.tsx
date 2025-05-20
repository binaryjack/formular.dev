import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
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
        <div className={`select-list`}>
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
