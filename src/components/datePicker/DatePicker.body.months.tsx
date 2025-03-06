import DatePickerCell from './components/DatePicker.cell'
import { useDatePickerContext } from './components/DatePicker.context'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'

interface IDatePickerBodyMonthsProps {}

const DatePickerBodyMonths = ({}: IDatePickerBodyMonthsProps) => {
    const { gridData, updateSelectedCells, selectedCells, selectionMode } = useDatePickerContext()

    const handleDisplayInfos = (cell: IDatePickerCell) => {}

    const onSelectedCell = (cell: IDatePickerCell) => {
        updateSelectedCells([cell])
    }

    return (
        <div className={`date-picker-body-months-container`}>
            <div className={`date-picker-body-months-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
                                selectionMode={selectionMode}
                                gridDisplayMode={'MONTH'}
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

export default DatePickerBodyMonths
