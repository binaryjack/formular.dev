import { DatePickerDisplayType } from '../core/DatePicker.types'
import { useDatePickerContext } from './DatePicker.context'

interface IDatePickerSwitch {
    day: React.ReactNode
    month: React.ReactNode
    year: React.ReactNode

    definedGridMode?: DatePickerDisplayType
}

/**
 * A functional component that renders different content based on the current grid mode.
 * The grid mode determines whether the day, month, or year is displayed.
 *
 * @param {IDatePickerSwitch} props - The props for the DatePickerSwitch component.
 * @param {React.ReactNode} props.day - The content to display when the grid mode is set to 'DAY'.
 * @param {React.ReactNode} props.month - The content to display when the grid mode is set to 'MONTH'.
 * @param {React.ReactNode} props.year - The content to display when the grid mode is set to 'YEAR'.
 * @param {'DAY' | 'MONTH' | 'YEAR'} [props.definedGridMode] - An optional override for the grid mode.
 * If not provided, the grid mode is retrieved from the `useDatePickerContext` hook.
 *
 * @returns {JSX.Element} A JSX element that conditionally renders the appropriate content
 * based on the grid mode.
 */
const DatePickerSwitch = ({ day, month, year, definedGridMode }: IDatePickerSwitch) => {
    const { gridMode } = useDatePickerContext()
    const _gridMode = definedGridMode ?? gridMode
    return (
        <>
            {_gridMode === 'DAY' && <>{day}</>}
            {_gridMode === 'YEAR' && <>{year}</>}
            {_gridMode === 'MONTH' && <>{month}</>}
        </>
    )
}
export default DatePickerSwitch
