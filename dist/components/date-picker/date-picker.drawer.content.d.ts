import { INDate } from '../../core/framework/schema/descriptor/i-n-date';
import { DatePickerFormatsEnum, DatePickerGridModeType, DatePickerSelectionModeType } from './core/date-picker.types';
interface IDatePickerDrawerProps {
    id: string;
    separator?: string;
    defaultDate?: INDate | Date | string;
    dataFormat?: DatePickerFormatsEnum;
    displayFormat?: DatePickerFormatsEnum;
    onSelectDate: (startDate?: INDate, endDate?: INDate) => void;
    onClearField?: () => void;
    defaultSelectionMode?: DatePickerSelectionModeType;
    defaultGridMode?: DatePickerGridModeType;
    showFooter?: boolean;
    width?: string;
    height?: string;
}
/**
 * The `DatePickerContentDrawer` component is a React functional component that provides
 * a date picker interface within a drawer. It allows users to select dates, navigate
 * through different grid modes (day, month, year), and manage date selections.
 *
 * Author: Tadeo Piana.
 *
 * @param {IDatePickerDrawerProps} props - The properties for the component.
 * @param {string} props.id - The unique identifier for the date picker drawer.
 * @param {Date | string | INDate} [props.defaultDate] - The default date to initialize the date picker.
 * @param {(startDate: INDate | undefined, endDate: INDate | undefined) => void} props.onSelectDate - Callback function triggered when a date is selected.
 * @param {boolean} [props.showFooter] - Determines whether the footer is displayed in the drawer.
 * @param {string} [props.separator='-'] - The separator used for date formatting.
 * @param {string} [props.dataFormat] - The format used for parsing date strings.
 * @param {string} [props.displayFormat] - The format used for displaying dates.
 * @param {'single' | 'range'} [props.defaultSelectionMode='single'] - The default selection mode for the date picker.
 * @param {'DAY' | 'MONTH' | 'YEAR'} [props.defaultGridMode='DAY'] - The default grid mode for the date picker.
 * @param {string} [props.width='100%'] - The width of the drawer.
 * @param {string} [props.height='100%'] - The height of the drawer.
 *
 * @property {string} selectionMode - Determines how dates can be selected in the date picker.
 * - `'single'`: Allows the user to select a single date.
 * - `'range'`: Allows the user to select a range of dates (start and end dates).
 * This property is used to configure the behavior of the date picker and is shared
 * across child components via the `DatePickerContext`.
 *
 * @returns {JSX.Element} The rendered `DatePickerContentDrawer` component.
 *
 * @remarks
 * - The component uses a context (`DatePickerContext`) to manage and share state across
 *   its child components.
 * - The `jumpToNow` and `jumpToSelection` functions allow quick navigation to the current
 *   date or the selected date, respectively.
 * - The `updateGrid` function dynamically updates the grid data based on the current grid
 *   mode and internal date.
 * - The component supports keyboard navigation through the `useKeyBindings` hook.
 *
 * @example
 * ```tsx
 * <DatePickerContentDrawer
 *   id="my-date-picker"
 *   defaultDate={new Date()}
 *   onSelectDate={(startDate, endDate) => console.log(startDate, endDate)}
 *   showFooter={true}
 *   separator="/"
 *   displayFormat="MM/dd/yyyy"
 *   defaultSelectionMode="range"
 *   defaultGridMode="MONTH"
 * />
 * ```
 * ### Keybindings
 * The `DatePickerContentDrawer` supports the following keyboard shortcuts for navigation and interaction:
 *
 * - **Escape**: Closes the drawer.
 * - **Arrow Left**: Moves to the previous date in the current grid mode.
 * - **Arrow Right**: Moves to the next date in the current grid mode.
 * - **Ctrl + Enter**: Closes the drawer.
 * - **Y / y**: Switches the grid mode to 'YEAR'.
 * - **M / m**: Switches the grid mode to 'MONTH'.
 * - **D / d**: Switches the grid mode to 'DAY'.
 * - **N / n**: Jumps to the current date.
 * - **S / s**: Jumps to the currently selected date.
 *
 * These keybindings enhance the usability of the date picker by allowing users to navigate and interact with the component using the keyboard.
 */
declare const DatePickerContentDrawer: ({ id, defaultDate, onSelectDate, onClearField, showFooter, separator, dataFormat, displayFormat, defaultSelectionMode, defaultGridMode, width, height }: IDatePickerDrawerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default DatePickerContentDrawer;
