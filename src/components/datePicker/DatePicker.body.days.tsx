import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import Button from '../button/Button'
import Portal from '../portals/Portal'
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
        updateInternalDate,
        next,
        previous
    } = useDatePickerContext()

    const handleDisplayInfos = (cell: IDatePickerCell) => {}

    const handleMovePrevious = () => previous('MONTH')

    const handleMoveNext = () => next('MONTH')

    const onSelectedCell = (cell: IDatePickerCell) => {
        if (cell.item?.isNextScope) {
            if (!internalDate) return
            next('MONTH')
            return
        }
        if (cell.item?.isPreviousScope) {
            if (!internalDate) return
            previous('MONTH')
            return
        }

        if (selectionMode === 'single' || selectedCells.length > 1) {
            updateSelectedCells([cell])
            if (cell.item?.date?.dateObject) {
                const newDate = new Date(
                    internalDate.getFullYear(),
                    internalDate.getMonth(),
                    cell.item?.date?.dateObject?.day
                )
                updateInternalDate(newDate)
            }
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
            <Portal
                id={'header'}
                slotName={'previous'}
                children={
                    <Button
                        id={'dp-previous'}
                        title={'previous'}
                        variant={{ rounded: true }}
                        onClickCallback={handleMovePrevious}
                    >
                        <FaArrowCircleLeft />
                    </Button>
                }
            />
            <Portal
                id={'header'}
                slotName={'next'}
                children={
                    <Button
                        id={'dp-next'}
                        title={'next'}
                        variant={{ rounded: true }}
                        onClickCallback={handleMoveNext}
                    >
                        <FaArrowCircleRight />
                    </Button>
                }
            />
        </div>
    )
}

export default DatePickerBodyDays
