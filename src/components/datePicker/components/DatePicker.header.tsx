import { MdClear } from 'react-icons/md'
import { TbCalendar, TbCalendarCancel, TbCalendarSearch } from 'react-icons/tb'

import { Button } from '../../button/Button'
import { PortalSlot } from '../../portals/PortalSlot'
import { useDatePickerContext } from './DatePicker.context'
import DatePickerSwitch from './DatePicker.switch'

interface IDatePickerDrawerHeaderProps {
    id: string
}

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

    const btnSizes = 'sm'

    return (
        <div className={`date-picker-header `}>
            <div className={`date-picker-header-top`}>
                <div className={`selected`}>
                    <Button
                        disabled={selectedCells.length === 0}
                        id={'dp-now'}
                        title={'go to selected'}
                        variantProperties={{ rounded: true, size: btnSizes }}
                        onClickCallback={jumpToSelection}
                    >
                        <div className={`mr-2`}>Selected</div>
                        <TbCalendarSearch />
                    </Button>
                </div>

                <div className={`ml-1 now`}>
                    <Button
                        id={'dp-now'}
                        title={'go to now'}
                        variantProperties={{ rounded: true, size: btnSizes }}
                        onClickCallback={jumpToNow}
                    >
                        <div className={`mr-2`}>Now</div>
                        <TbCalendar />
                    </Button>
                </div>
                <div className={`ml-1 clear`}>
                    <Button
                        disabled={selectedCells.length === 0}
                        id={'dp-now'}
                        title={'clear selection'}
                        variantProperties={{ rounded: true, size: btnSizes }}
                        onClickCallback={clear}
                    >
                        <TbCalendarCancel />
                    </Button>
                </div>
                <div className={`ml-1 close`}>
                    <Button
                        id={'dp-now'}
                        title={'close'}
                        variantProperties={{ rounded: true, size: btnSizes }}
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
                            id={'dp-year'}
                            title={'year selection'}
                            variantProperties={{ rounded: true, size: btnSizes }}
                            onClickCallback={yearSelection}
                        >
                            {internalDate?.getFullYear()}
                        </Button>
                    </div>
                    <div className={`month mx-1`}>
                        <Button
                            id={'dp-month'}
                            title={'month selection'}
                            variantProperties={{ rounded: true, size: btnSizes }}
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
                            variantProperties={{ rounded: true, size: btnSizes }}
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
