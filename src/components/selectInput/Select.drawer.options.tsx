import { IOptionItem } from '../../dependency/schema/optionsSchema/options.scheme.types'
import SelectDrawerOption from './Select.drawer.option'

interface ISelectDrawerOptionsProps {
    options: IOptionItem[]
    selectedItemId: number
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
                        isSelected={item.id === selectedItemId.toString()}
                        onHandleSelectItem={onHandleSelectItem}
                    />
                )
            })}
        </div>
    )
}

export default SelectDrawerOptions
