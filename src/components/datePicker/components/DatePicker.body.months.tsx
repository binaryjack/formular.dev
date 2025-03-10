import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import Button from '../../button/Button'
import Portal from '../../portals/Portal'
import { IDatePickerCell, IDatePickerRow } from '../core/models/DatePicker.models'
import DatePickerCell from './DatePicker.cell'
import { useDatePickerContext } from './DatePicker.context'

interface IDatePickerBodyMonthsProps {}

const DatePickerBodyMonths = ({}: IDatePickerBodyMonthsProps) => {
    const {
        gridData,
        updateSelectedCells,
        selectedCells,
        selectionMode,
        internalDate,
        updateInternalDate,
        previous,
        next
    } = useDatePickerContext()

    const handleMovePrevious = () => previous('MONTH')

    const handleMoveNext = () => next('MONTH')

    const handleDisplayInfos = (cell: IDatePickerCell) => {}

    const onSelectedCell = (cell: IDatePickerCell) => {
        updateSelectedCells([cell])

        if (cell.item?.date?.dateObject) {
            const newDate = new Date(
                internalDate.getFullYear(),
                cell.item?.date?.dateObject?.month,
                internalDate.getDate()
            )
            updateInternalDate(newDate)
        }
    }

    return (
        <div className={`date-picker-body-container`}>
            <div className={`date-picker-body-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-picker-body-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
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
            <Portal
                id={'header'}
                slotName={'previous'}
                children={
                    <Button
                        id={'dp-previous'}
                        title={'previous'}
                        variant={{ rounded: true, size: 'md' }}
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
                        variant={{ rounded: true, size: 'md' }}
                        onClickCallback={handleMoveNext}
                    >
                        <FaArrowCircleRight />
                    </Button>
                }
            />
        </div>
    )
}

export default DatePickerBodyMonths
