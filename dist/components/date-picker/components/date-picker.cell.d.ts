import { DatePickerDisplayType } from '../core/date-picker.types';
import { IDatePickerCell } from '../core/models/date-picker.models';
interface IDatePickerCellProps {
    item: IDatePickerCell;
    selectedCells: IDatePickerCell[];
    gridDisplayMode: DatePickerDisplayType;
    onMouseEnter: (item: IDatePickerCell) => void;
    onSelected: (item: IDatePickerCell) => void;
}
/**
 * A React functional component representing a single cell in a date picker grid.
 *
 * @param {IDatePickerCellProps} props - The properties passed to the component.
 * @param {IDatePickerCell} props.item - The data for the current cell, including date and selection state.
 * @param {(item: IDatePickerCell) => void} props.onMouseEnter - Callback triggered when the mouse enters the cell.
 * @param {(item: IDatePickerCell) => void} props.onSelected - Callback triggered when the cell is clicked.
 * @param {string} props.gridDisplayMode - The display mode of the grid (e.g., day, month, year).
 * @param {IDatePickerCell[]} props.selectedCells - The list of currently selected cells.
 *
 * @returns {JSX.Element} A styled `div` element representing the date picker cell, with event handlers for mouse enter and click.
 *
 * @remarks
 * - The component uses `useState` to manage the state of the cell item.
 * - The `useEffect` hook updates the cell's selection state based on the `selectedCells` prop.
 * - The `useMemo` hook is used to compute derived values such as `scope`, `day`, `month`, and `year` for performance optimization.
 * - The `ifClass` utility is used to dynamically generate CSS class names based on the cell's state.
 *
 * @example
 * ```tsx
 * <DatePickerCell
 *   item={cellItem}
 *   onMouseEnter={handleMouseEnter}
 *   onSelected={handleCellSelected}
 *   gridDisplayMode="day"
 *   selectedCells={selectedCells}
 * />
 * ```
 */
declare const DatePickerCell: ({ item, onMouseEnter, onSelected, gridDisplayMode, selectedCells }: IDatePickerCellProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default DatePickerCell;
