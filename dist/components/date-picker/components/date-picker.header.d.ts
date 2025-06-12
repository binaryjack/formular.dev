interface IDatePickerDrawerHeaderProps {
    id: string;
}
/**
 * The `DatePickerDrawerHeader` component renders the header section of a date picker drawer.
 * It provides controls for navigating and interacting with the date picker, including options
 * to jump to the current date, clear the selection, close the drawer, and select specific
 * date parts (year, month, day).
 *
 * @param {IDatePickerDrawerHeaderProps} props - The properties for the component.
 * @param {string} props.id - The unique identifier for the component, used for portal slot integration.
 *
 * @returns {JSX.Element} The rendered header component for the date picker drawer.
 *
 * @remarks
 * - This component relies on context providers (`useDatePickerContext` and `useDrawerContext`)
 *   to manage state and behavior.
 * - The header includes buttons for various actions, such as navigating to the selected date,
 *   jumping to the current date, clearing the selection, and closing the drawer.
 * - The bottom section of the header allows users to select specific date parts (year, month, day)
 *   and displays the current grid mode (day, month, or year).
 *
 * @example
 * ```tsx
 * <DatePickerDrawerHeader id="my-date-picker-header" />
 * ```
 */
declare const DatePickerDrawerHeader: ({ id }: IDatePickerDrawerHeaderProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default DatePickerDrawerHeader;
