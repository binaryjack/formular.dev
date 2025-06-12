import { IOptionItem } from '../../core/framework/schema/options-schema/options.scheme.types';
interface ISelectDrawerOptionsProps {
    options: IOptionItem[];
    selectedItemSequenceId: number | null;
    onHandleSelectItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IOptionItem) => void;
}
declare const SelectDrawerOptions: ({ options, selectedItemSequenceId, onHandleSelectItem }: ISelectDrawerOptionsProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default SelectDrawerOptions;
