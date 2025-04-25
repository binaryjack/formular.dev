import { IOptionItem } from '../../dependency/schema/options-schema/options.scheme.types'
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
            {options.map((item) => {
                return (
                    <SelectDrawerOption
                        key={item.id}
                        option={item}
                        isSelected={item.sequenceId === selectedItemSequenceId}
                        onHandleSelectItem={onHandleSelectItem}
                    />
                )
            })}
        </div>
    )
}

export default SelectDrawerOptions
