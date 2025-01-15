import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import { INDate } from '../../../../../dependency/schema/descriptor/field.data.date.struct'
import { DrawerOpenStateType } from '../../drawer/Drawer.types'

interface IDatePickerDrawerProps {
    drawerOpenState?: DrawerOpenStateType
    selectedDate?: INDate
    onSetOpenState: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    onSelectDate: (value: INDate) => void
}

const DatePickerDrawer = ({
    drawerOpenState,
    selectedDate,
    onSetOpenState,
    onSelectDate
}: IDatePickerDrawerProps) => {
    return (
        <div className={`date-picker-drawer`}>
            <div className={`date-picker-header`}>
                <button
                    type="button"
                    className={`btn-sm-p mr-1`}
                    title={`Previous`}
                    onClick={() => {}}
                >
                    <FaArrowCircleLeft />
                </button>
                <div className={`date-picker-date-parts`}>
                    <div className={`year`}>
                        <button
                            type="button"
                            className={`btn-sm-p mr-1`}
                            title={`btn-year-mode`}
                            onClick={() => {}}
                        ></button>
                    </div>
                    <div className={`month`}>
                        <button
                            type="button"
                            className={`btn-sm-p mr-1`}
                            title={`btn-month-mode`}
                            onClick={() => {}}
                        ></button>
                    </div>
                    <div className={`day`}>
                        <button
                            type="button"
                            className={`btn-sm-p mr-1`}
                            title={`btn-day-mode`}
                            onClick={() => {}}
                        ></button>
                    </div>
                </div>
                <div className={`date-picker-date`}></div>
                <button
                    className={`btn-sm-p mr-1`}
                    type="button"
                    title={`Previous`}
                    onClick={() => {}}
                >
                    <FaArrowCircleRight />
                </button>
            </div>
            <div className={`date-picker-body`}></div>
        </div>
    )
}

export default DatePickerDrawer
