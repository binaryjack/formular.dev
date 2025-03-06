import DatePickerCell from './components/DatePicker.cell'
import { useDatePickerContext } from './components/DatePicker.context'
import { computeRange } from './core/DatePicker.utils'
import { IDatePickerCell, IDatePickerRow } from './core/models/DatePicker.models'

interface IDatePickerBodyDaysProps {}

const DatePickerBodyDays = ({}: IDatePickerBodyDaysProps) => {
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

        if (selectionMode === 'single' || selectedCells.length > 1) {
            updateSelectedCells([cell])
            return
        }
        let newSelection: IDatePickerCell[] = []

        newSelection = [...selectedCells, cell].sort((a, b) => a.ts - b.ts)
        newSelection.push(...computeRange(newSelection))

        updateSelectedCells(newSelection.sort((a, b) => a.ts - b.ts))
    }

    return (
        <div className={`date-picker-body-days-container`}>
            <div className={`date-picker-body-days-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
                                selectionMode={selectionMode}
                                gridDisplayMode={'DAY'}
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

export default DatePickerBodyDays
