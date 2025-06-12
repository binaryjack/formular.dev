import { IOptionItem } from '../../core/framework/schema/options-schema/options.scheme.types';
interface ISelectDrawerProps {
    items: IOptionItem[];
    filterTriggerDelay: number;
    selectedItemSequenceId: number | null;
    onSelectItem: (value: IOptionItem) => void;
    width?: string;
    height?: string;
    defaultSelectedItem?: IOptionItem;
}
declare const SelectDrawerContent: ({ items, filterTriggerDelay, selectedItemSequenceId, onSelectItem, width, height, defaultSelectedItem }: ISelectDrawerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default SelectDrawerContent;
