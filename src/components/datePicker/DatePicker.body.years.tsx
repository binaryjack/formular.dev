import DatePickerCell from './components/DatePicker.cell'
import { useDatePickerContext } from './components/DatePicker.context'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'

interface IDatePickerBodyYearsProps {}

const DatePickerBodyYears = ({}: IDatePickerBodyYearsProps) => {
    const {
        gridData,
        updateSelectedCells,
        selectedCells,
        selectionMode,
        internalDate,
        next,
        previous
    } = useDatePickerContext()

    const handleDisplayInfos = (cell: IDatePickerCell) => {}

    const onSelectedCell = (cell: IDatePickerCell) => {
        if (cell.item?.isNextScope) {
            if (!internalDate) return
            next()
            return
        }
        if (cell.item?.isPreviousScope) {
            if (!internalDate) return
            previous()
            return
        }
        updateSelectedCells([cell])
    }

    return (
        <div className={`date-picker-body-years-container`}>
            <div className={`date-picker-body-years-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
                                selectionMode={selectionMode}
                                gridDisplayMode={'YEAR'}
                                selectedCells={selectedCells}
                                onMouseEnter={handleDisplayInfos}
                                onSelected={onSelectedCell}
                                item={dateRow}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DatePickerBodyYears
