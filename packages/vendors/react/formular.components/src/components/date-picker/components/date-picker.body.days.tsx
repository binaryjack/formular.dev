import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { Button, IButtonVariant } from '../../button/button'
import { Portal } from '../../portals/portals'
import { computeRange } from '../core/computed/compute-range'
import { IDatePickerCell, IDatePickerRow } from '../core/models/date-picker.models'

import useAppContext from '@components/context/app-context/app-context.context'
import DatePickerCell from './date-picker.cell'
import { useDatePickerContext } from './date-picker.context'
interface IDatePickerBodyDaysProps {
    id: string
}

const DatePickerBodyDays = ({ id }: IDatePickerBodyDaysProps) => {
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
        <div className={`date-picker-body-container`}>
            <div className={`date-picker-body-wrapper`}>
                {gridData.map((dateRow: IDatePickerRow) => (
                    <div key={dateRow.id} className={`date-picker-body-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <DatePickerCell
                                key={dateRow.code}
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

export default DatePickerBodyDays
