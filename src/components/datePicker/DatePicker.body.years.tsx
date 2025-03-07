import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import Button from '../button/Button'
import Portal from '../portals/Portal'
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
        updateInternalDate,
        next,
        previous
    } = useDatePickerContext()

    const handleDisplayInfos = (cell: IDatePickerCell) => {}

    const handleMovePrevious = () => previous()

    const handleMoveNext = () => next()

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
        if (cell.item?.date?.dateObject) {
            const newDate = new Date(
                cell.item?.date?.dateObject?.year,
                internalDate.getMonth(),
                internalDate.getDate()
            )
            updateInternalDate(newDate)
        }
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

export default DatePickerBodyYears
