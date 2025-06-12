import { IOptionItem } from '../../core/framework/schema/options-schema/options.scheme.types';
interface ISelectDrawerUIProps {
    items: IOptionItem[];
    filterTriggerDelay: number;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    onHandleSelectItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IOptionItem) => void;
    selectedItemSequenceId: number | null;
    onFilterItems: (value: string) => void;
    onClearFilter: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    width?: string;
    height?: string;
}
declare const SelectDrawerContentUI: ({ items, handleKeyDown, onHandleSelectItem, selectedItemSequenceId, filterTriggerDelay, onFilterItems, onClearFilter, width, height }: ISelectDrawerUIProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default SelectDrawerContentUI;
