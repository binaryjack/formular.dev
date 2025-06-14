import { MdClear } from 'react-icons/md'
import { TbCalendar, TbCalendarCancel, TbCalendarSearch } from 'react-icons/tb'

import { conventions } from 'formular.dev.lib'
import { Button } from '../../button/button'
import { useDrawerContext } from '../../drawer/components/drawer.context'
import { PortalSlot } from '../../portals/portals-slot'
import { useDatePickerContext } from './date-picker.context'
import './date-picker.header.css'
import DatePickerSwitch from './date-picker.switch'
interface IDatePickerDrawerHeaderProps {
    id: string
}

/**
 * The `DatePickerDrawerHeader` component renders the header section of a date picker drawer.
 * It provides controls for navigating and interacting with the date picker, including options
 * to jump to the current date, clear the selection, close the drawer, and select specific
 * date parts (year, month, day).
 *
 * @param {IDatePickerDrawerHeaderProps} props - The properties for the component.
 * @param {string} props.id - The unique identifier for the component, used for portal slot integration.
 *
 * @returns {JSX.Element} The rendered header component for the date picker drawer.
 *
 * @remarks
 * - This component relies on context providers (`useDatePickerContext` and `useDrawerContext`)
 *   to manage state and behavior.
 * - The header includes buttons for various actions, such as navigating to the selected date,
 *   jumping to the current date, clearing the selection, and closing the drawer.
 * - The bottom section of the header allows users to select specific date parts (year, month, day)
 *   and displays the current grid mode (day, month, or year).
 *
 * @example
 * ```tsx
 * <DatePickerDrawerHeader id="my-date-picker-header" />
 * ```
 */

const DatePickerDrawerHeader = ({ id }: IDatePickerDrawerHeaderProps) => {
    const {
        gridMode,
        internalDate,
        updateGridMode,
        jumpToNow,
        jumpToSelection,

        selectedCells,
        clear,
        close
    } = useDatePickerContext()

    const { toggleState } = useDrawerContext()

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
            <div className={`date-picker-header-top`}>
                <div className={`selected`}>
                    <Button
                        tabindex={toggleState === 'open' ? 0 : -1}
                        disabled={selectedCells.length === 0}
                        id={'dp-now'}
                        title={'go to selected (s)'}
                        variantProperties={conventions.commands.basic}
                        onClickCallback={jumpToSelection}
                    >
                        <div className={`mr-1`}>Selected</div>
                        <TbCalendarSearch />
                    </Button>
                </div>

                <div className={`ml-1 now`}>
                    <Button
                        tabindex={toggleState === 'open' ? 0 : -1}
                        id={'dp-now'}
                        title={'go to now (n)'}
                        variantProperties={conventions.commands.basic}
                        onClickCallback={jumpToNow}
                    >
                        <div className={`mr-1`}>Now</div>
                        <TbCalendar />
                    </Button>
                </div>
                <div className={`ml-1 clear`}>
                    <Button
                        tabindex={toggleState === 'open' ? 0 : -1}
                        disabled={selectedCells.length === 0}
                        id={'dp-now'}
                        title={'clear selection (c)'}
                        variantProperties={conventions.commands.basic}
                        onClickCallback={clear}
                    >
                        <TbCalendarCancel />
                    </Button>
                </div>
                <div className={`ml-1 close`}>
                    <Button
                        tabindex={toggleState === 'open' ? 0 : -1}
                        id={'dp-now'}
                        title={'close (Escape)'}
                        variantProperties={conventions.commands.basic}
                        onClickCallback={close}
                    >
                        <MdClear />
                    </Button>
                </div>
            </div>
            <div className={`date-picker-header-separator`} />
            <div className={`date-picker-header-bottom`}>
                <PortalSlot id={id} slotName={'previous'} />

                <div className={`date-picker-date-parts`}>
                    <div className={`year`}>
                        <Button
                            tabindex={toggleState === 'open' ? 0 : -1}
                            id={'dp-year'}
                            title={'year selection (y)'}
                            variantProperties={conventions.commands.basic}
                            onClickCallback={yearSelection}
                        >
                            {internalDate?.getFullYear()}
                        </Button>
                    </div>
                    <div className={`month mx-1`}>
                        <Button
                            tabindex={toggleState === 'open' ? 0 : -1}
                            id={'dp-month'}
                            title={'month selection (m)'}
                            variantProperties={conventions.commands.basic}
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
                            tabindex={toggleState === 'open' ? 0 : -1}
                            id={'dp-day'}
                            title={'day selection (d)'}
                            variantProperties={conventions.commands.basic}
                            onClickCallback={daySelection}
                        >
                            {internalDate?.getDate?.()?.toString()?.padStart(2, '0')}
                        </Button>
                    </div>
                </div>
                <PortalSlot id={id} slotName={'next'} />
            </div>
            <div className={`date-picker-header-grid-mode`}>
                <DatePickerSwitch
                    day={
                        <>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                        </>
                    }
                    month={<div>Month</div>}
                    year={<div>Years</div>}
                />
            </div>
        </div>
    )
}

export default DatePickerDrawerHeader
