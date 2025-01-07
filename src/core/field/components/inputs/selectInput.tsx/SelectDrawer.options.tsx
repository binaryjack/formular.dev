import { IOptionItem } from '../../../../../dependency/schema/optionsSchema/options.scheme.types'

interface ISelecteDrawerOptionProps {
    option: IOptionItem
    isSelected: boolean
    onHandleSelectItem: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        value: IOptionItem
    ) => void
}

const SelecteDrawerOption = ({
    option,
    isSelected,
    onHandleSelectItem
}: ISelecteDrawerOptionProps) => {
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

export default SelecteDrawerOption
