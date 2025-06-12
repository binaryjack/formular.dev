import { DatePickerSelectionModeType } from './core/date-picker.types';
interface IDatePickerDrawerProps {
    id: string;
    defaultSelectionMode?: DatePickerSelectionModeType;
    showFooter?: boolean;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    width?: string;
    height?: string;
}
/**
 * A functional component that renders a customizable DatePicker drawer UI.
 *
 * @param {IDatePickerDrawerProps} props - The properties for the DatePickerDrawerUI component.
 * @param {string} props.id - A unique identifier for the DatePicker component.
 * @param {boolean} props.showFooter - Determines whether the footer section is displayed.
 * @param {'single' | 'range'} [props.defaultSelectionMode='single'] - The default selection mode for the DatePicker.
 * @param {(event: React.KeyboardEvent<HTMLDivElement>) => void} props.handleKeyDown - A callback function triggered on keydown events.
 * @param {(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void} props.onClick - A callback function triggered on click events.
 * @param {string | number} props.width - The width of the DatePicker container.
 * @param {string | number} props.height - The height of the DatePicker container.
 *
 * @returns {JSX.Element} The rendered DatePicker drawer UI component.
 */
declare const DatePickerDrawerUI: ({ id, showFooter, defaultSelectionMode, handleKeyDown, onClick, width, height }: IDatePickerDrawerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default DatePickerDrawerUI;
