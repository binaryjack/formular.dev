import { BsCalendar3, BsCalendar3Event, BsCalendar3Range, BsCalendarDate } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'

import DatePickerBodyDays from './components/DatePicker.body.days'
import DatePickerBodyMonths from './components/DatePicker.body.months'
import DatePickerBodyYears from './components/DatePicker.body.years'
import DatePickerDrawerHeader from './components/DatePicker.header'
import DatePickerSwitch from './components/DatePicker.switch'
import { DatePickerSelectionModeType } from './core/DatePicker.types'

interface IDatePickerDrawerProps {
    id: string
    defaultSelectionMode?: DatePickerSelectionModeType
    showFooter?: boolean
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    width?: string
    height?: string
}

const DatePickerDrawerUI = ({
    id,
    showFooter,
    defaultSelectionMode = 'single',
    onClick,
    width,
    height
}: IDatePickerDrawerProps) => {
    return (
        <div
            className={`date-picker-container overflow-hidden`}
            onClick={onClick}
            style={{ width: width, height: height }}
        >
            <DatePickerDrawerHeader id={id} />

            <div className={`date-picker-body`}>
                <DatePickerSwitch
                    day={<DatePickerBodyDays id={id} />}
                    year={<DatePickerBodyYears id={id} />}
                    month={<DatePickerBodyMonths id={id} />}
                />
            </div>

            {showFooter ? (
                <div className={`date-picker-footer`}>
                    <div className={`grid-mode`}>
                        <div>grid mode: </div>
                        <div>
                            <DatePickerSwitch
                                day={<BsCalendarDate title={`day`} />}
                                month={<BsCalendar3 title={`month`} />}
                                year={<TbWorld title={`year`} />}
                            />
                        </div>
                    </div>

                    <div className={`grid-mode`}>
                        <div>selection mode: </div>
                        <div>
                            {defaultSelectionMode === 'range' ? (
                                <BsCalendar3Range title={`range`} />
                            ) : (
                                <BsCalendar3Event title={`single`} />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default DatePickerDrawerUI
