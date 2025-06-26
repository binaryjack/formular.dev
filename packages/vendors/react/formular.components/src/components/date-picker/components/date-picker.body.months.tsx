import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { Button, IButtonVariant } from '../../button/button'
import { Portal } from '../../portals/portals'
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'
import './date-picker.body.css'

import useAppContext from '@components/context/app-context/app-context.context'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'

interface IDatePickerBodyMonthsProps {
    id: string
}

const DatePickerBodyMonths = ({ id }: IDatePickerBodyMonthsProps) => {
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

    const { getConfiguration } = useAppContext()
    const basicConfig = getConfiguration<Partial<IButtonVariant> | undefined>(
        'rendering',
        'commands',
        'primary'
    )

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

export default DatePickerBodyMonths
