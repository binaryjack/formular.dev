import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { DatePickerGridMode } from '../../dependency/dateModels'
import { getNextDate, getPreviousDate } from '../../field/datePickerBase/DatePicker.utils'
import Button from '../button/Button'

interface IDatePickerDrawerHeaderProps {
    gridMode: DatePickerGridMode
    internalDate: Date
    updateInternalDate: (newDate: Date) => void
    updateGridMode: (gridMode: DatePickerGridMode) => void
}

const DatePickerDrawerHeader = ({
    gridMode,
    internalDate,
    updateInternalDate,
    updateGridMode
}: IDatePickerDrawerHeaderProps) => {
    const handleMovePrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!internalDate) return
        updateInternalDate(getPreviousDate(gridMode, internalDate))
    }
    const handleMoveNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        if (!internalDate) return
        updateInternalDate(getNextDate(gridMode, internalDate))
    }

    const yearSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('YEAR')
    }
    const monthSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('MONTH')
    }
    const daySelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        updateGridMode('DAY')
    }

    return (
        <div className={`date-picker-header `}>
            <Button
                id={'dp-previous'}
                title={'previous'}
                variant={{ rounded: true }}
                onClickCallback={handleMovePrevious}
            >
                <FaArrowCircleLeft />
            </Button>

            <div className={`date-picker-date-parts`}>
                <div className={`year`}>
                    <Button
                        id={'dp-year'}
                        title={'year selection'}
                        variant={{ rounded: true }}
                        onClickCallback={yearSelection}
                    >
                        {internalDate?.getFullYear()}
                    </Button>
                </div>
                <div className={`month`}>
                    <Button
                        id={'dp-month'}
                        title={'month selection'}
                        variant={{ rounded: true }}
                        onClickCallback={monthSelection}
                    >
                        {(internalDate?.getMonth() || internalDate?.getMonth() === 0
                            ? internalDate?.getMonth() + 1
                            : 0
                        )
                            ?.toString()
                            ?.padStart(2, '0')}
                    </Button>
                </div>
                <div className={`day`}>
                    <Button
                        id={'dp-day'}
                        title={'day selection'}
                        variant={{ rounded: true }}
                        onClickCallback={daySelection}
                    >
                        {internalDate?.getDate?.()?.toString()?.padStart(2, '0')}
                    </Button>
                </div>
            </div>
            <div className={`date-picker-date`}></div>

            <Button
                id={'dp-next'}
                title={'next'}
                variant={{ rounded: true }}
                onClickCallback={handleMoveNext}
            >
                <FaArrowCircleRight />
            </Button>
        </div>
    )
}

export default DatePickerDrawerHeader
