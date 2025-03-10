import { MdClear } from 'react-icons/md'
import { TbCalendar, TbCalendarCancel, TbCalendarSearch } from 'react-icons/tb'

import Button from '../../button/Button'
import { useDatePickerContext } from './DatePicker.context'

const DatePickerDrawerHeader = () => {
    const { internalDate, updateGridMode, resetTo, selectedCells, clear, close } =
        useDatePickerContext()

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
                        variant={{ rounded: true, size: btnSizes }}
                        onClickCallback={() => resetTo(false)}
                    >
                        <div className={`mr-2`}>Selected</div>
                        <TbCalendarSearch />
                    </Button>
                </div>

                <div className={`ml-1 now`}>
                    <Button
                        id={'dp-now'}
                        title={'go to now'}
                        variant={{ rounded: true, size: btnSizes }}
                        onClickCallback={() => resetTo(true)}
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
                        variant={{ rounded: true, size: btnSizes }}
                        onClickCallback={clear}
                    >
                        <TbCalendarCancel />
                    </Button>
                </div>
                <div className={`ml-1 close`}>
                    <Button
                        id={'dp-now'}
                        title={'close'}
                        variant={{ rounded: true, size: btnSizes }}
                        onClickCallback={close}
                    >
                        <MdClear />
                    </Button>
                </div>
            </div>
            <div className={`date-picker-header-separator`} />
            <div className={`date-picker-header-bottom`}>
                <div id={`header-previous-container`} />

                <div className={`date-picker-date-parts`}>
                    <div className={`year`}>
                        <Button
                            id={'dp-year'}
                            title={'year selection'}
                            variant={{ rounded: true, size: btnSizes }}
                            onClickCallback={yearSelection}
                        >
                            {internalDate?.getFullYear()}
                        </Button>
                    </div>
                    <div className={`month ml-1 mr-1`}>
                        <Button
                            id={'dp-month'}
                            title={'month selection'}
                            variant={{ rounded: true, size: btnSizes }}
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
                            variant={{ rounded: true, size: btnSizes }}
                            onClickCallback={daySelection}
                        >
                            {internalDate?.getDate?.()?.toString()?.padStart(2, '0')}
                        </Button>
                    </div>
                </div>
                <div id={`header-next-container`} />
            </div>
        </div>
    )
}

export default DatePickerDrawerHeader
