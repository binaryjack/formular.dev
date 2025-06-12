import { IDatePickerCell } from '../models/date-picker.models';
/**
 * Computes a range of date picker cells between two selected dates.
 *
 * @param selection - An array of `IDatePickerCell` objects representing the selected dates.
 *                     The array should contain at least two elements: the start date and the end date.
 * @returns An array of `IDatePickerCell` objects representing the range of dates between the start and end dates.
 *          If the selection is invalid or the dates cannot be computed, an empty array is returned.
 */
export declare const computeRange: (selection: IDatePickerCell[]) => IDatePickerCell[];
