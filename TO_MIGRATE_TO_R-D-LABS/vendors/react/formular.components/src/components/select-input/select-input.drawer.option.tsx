import { cx } from 'formular.design.system'
import { IOptionItem } from 'formular.dev.lib'

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
            data-sequence-id={option.sequenceId}
            className={cx(
                'p-2 hover:bg-primary-50 cursor-pointer',
                isSelected ? 'bg-primary-100' : ''
            )}
            onClick={(e) => onHandleSelectItem(e, option)}
        >
            {option.text}
        </div>
    )
}

export default SelectDrawerOption
