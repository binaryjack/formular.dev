import { IOptionItem } from '../../core/framework/schema/options-schema/options.scheme.types';
interface ISelectDrawerOptionProps {
    option: IOptionItem;
    isSelected: boolean;
    onHandleSelectItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IOptionItem) => void;
}
declare const SelectDrawerOption: ({ option, isSelected, onHandleSelectItem }: ISelectDrawerOptionProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default SelectDrawerOption;
