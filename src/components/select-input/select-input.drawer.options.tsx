import { IOptionItem } from '../../dependency/schema/options-schema/options.scheme.types'
import SelectDrawerOption from './select-input.drawer.option'

interface ISelectDrawerOptionsProps {
    options: IOptionItem[]
    selectedItemId: string
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
}

const SelectDrawerOptions = ({
    options,
    selectedItemId,
    onHandleSelectItem
}: ISelectDrawerOptionsProps) => {
    return (
        <div className={`select-list`}>
            {options.map((item) => {
                return (
                    <SelectDrawerOption
                        key={item.id}
                        option={item}
                        isSelected={item.id === selectedItemId}
                        onHandleSelectItem={onHandleSelectItem}
                    />
                )
            })}
        </div>
    )
}

export default SelectDrawerOptions
