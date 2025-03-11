import { DatePickerDisplayType } from '../core/DatePicker.types'
import { useDatePickerContext } from './DatePicker.context'

interface IDatePickerSwitch {
    day: React.ReactNode
    month: React.ReactNode
    year: React.ReactNode

    definedGridMode?: DatePickerDisplayType
}

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
