import { SlTarget } from 'react-icons/sl'

import Button from '../button/Button'
import { useDatePickerContext } from './components/DatePicker.context'

interface IDatePickerDrawerHeaderProps {}

const DatePickerDrawerHeader = ({}: IDatePickerDrawerHeaderProps) => {
    const { internalDate, updateGridMode, resetTo } = useDatePickerContext()

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
            <div id={`header-previous-container`} />

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

                <div className={`selected`}>
                    <Button
                        id={'dp-now'}
                        title={'reset to selected'}
                        variant={{ rounded: true }}
                        onClickCallback={() => resetTo(false)}
                    >
                        <SlTarget />
                    </Button>
                </div>

                <div className={`now`}>
                    <Button
                        id={'dp-now'}
                        title={'reset to now'}
                        variant={{ rounded: true }}
                        onClickCallback={() => resetTo(true)}
                    >
                        <SlTarget />
                    </Button>
                </div>
            </div>
            <div className={`date-picker-date`}></div>

            <div id={`header-next-container`} />
        </div>
    )
}

export default DatePickerDrawerHeader
