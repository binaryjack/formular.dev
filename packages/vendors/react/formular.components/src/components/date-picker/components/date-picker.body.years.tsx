import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { Button, IButtonVariant } from '../../button/button'
import { Portal } from '../../portals/portals'
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'
import './date-picker.body.css'

import useAppContext from '@components/context/app-context/app-context.context'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'
interface IDatePickerBodyYearsProps {
    id: string
}

const DatePickerBodyYears = ({ id }: IDatePickerBodyYearsProps) => {
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

    const { getConfiguration } = useAppContext()
    const basicConfig = getConfiguration<Partial<IButtonVariant> | undefined>(
        'rendering',
        'commands',
        'primary'
    )

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
        <div className={`date-picker-body-container`}>
            <div className={`date-picker-body-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-picker-body-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
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
                id={id}
                slotName={'previous'}
                children={
                    <Button
                        id={'dp-previous'}
                        title={'previous (<=)'}
                        variantProperties={basicConfig}
                        onClickCallback={handleMovePrevious}
                    >
                        <FaArrowCircleLeft />
                    </Button>
                }
            />
            <Portal
                id={id}
                slotName={'next'}
                children={
                    <Button
                        id={'dp-next'}
                        title={'next (=>)'}
                        variantProperties={basicConfig}
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
