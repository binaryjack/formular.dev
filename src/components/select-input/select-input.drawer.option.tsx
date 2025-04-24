import { IOptionItem } from '../../dependency/schema/options-schema/options.scheme.types'

interface ISelectDrawerOptionProps {
    option: IOptionItem
    isSelected: boolean
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
}

const SelectDrawerOption = ({
    option,
    isSelected,
    onHandleSelectItem
}: ISelectDrawerOptionProps) => {
    return (
        <div
            id={option.id}
            className={`select-item ${isSelected ? 'selected' : ''}`}
            onClick={(e) => onHandleSelectItem(e, option)}
        >
            {option.text}
        </div>
    )
}

export default SelectDrawerOption
