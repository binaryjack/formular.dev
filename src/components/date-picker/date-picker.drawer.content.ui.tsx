import { BsCalendar3, BsCalendar3Event, BsCalendar3Range, BsCalendarDate } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'

import { useEffect } from 'react'

import { useObjectRef } from '@core/framework/react/hooks/use-object-ref'
import { useToggleableContext } from '../toggleable/toggleable.context.hook'
import DatePickerBodyDays from './components/date-picker.body.days'
import DatePickerBodyMonths from './components/date-picker.body.months'
import DatePickerBodyYears from './components/date-picker.body.years'
import DatePickerDrawerHeader from './components/date-picker.header'
import DatePickerSwitch from './components/date-picker.switch'
import { DatePickerSelectionModeType } from './core/date-picker.types'

interface IDatePickerDrawerProps {
    id: string
    defaultSelectionMode?: DatePickerSelectionModeType
    showFooter?: boolean
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    width?: string
    height?: string
}

/**
 * A functional component that renders a customizable DatePicker drawer UI.
 *
 * @param {IDatePickerDrawerProps} props - The properties for the DatePickerDrawerUI component.
 * @param {string} props.id - A unique identifier for the DatePicker component.
 * @param {boolean} props.showFooter - Determines whether the footer section is displayed.
 * @param {'single' | 'range'} [props.defaultSelectionMode='single'] - The default selection mode for the DatePicker.
 * @param {(event: React.KeyboardEvent<HTMLDivElement>) => void} props.handleKeyDown - A callback function triggered on keydown events.
 * @param {(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void} props.onClick - A callback function triggered on click events.
 * @param {string | number} props.width - The width of the DatePicker container.
 * @param {string | number} props.height - The height of the DatePicker container.
 *
 * @returns {JSX.Element} The rendered DatePicker drawer UI component.
 */
const DatePickerDrawerUI = ({
    id,
    showFooter,
    defaultSelectionMode = 'single',
    handleKeyDown,
    onClick,
    width,
    height
}: IDatePickerDrawerProps) => {
    const { mainRef, castedRefObject } = useObjectRef<HTMLDivElement>()
    const { toggleState } = useToggleableContext()
    useEffect(() => {
        if (!castedRefObject || toggleState === 'closed') return
        castedRefObject?.focus()
    }, [toggleState])
    return (
        <div
            ref={mainRef}
            tabIndex={0}
            className={`date-picker-container overflow-hidden`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
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
