import { useEffect, useState } from 'react';
import {
    FaArrowCircleLeft, FaArrowCircleRight,
} from 'react-icons/fa';


import {
    INDate,
} from '../../../../../dependency/schema/descriptor/field.data.date.struct';
import {
    IDatePickerRow,
} from '../../../datePickerBase/DatePicker.types';
import {
    computeGrid,
} from '../../../datePickerBase/DatePicker.utils';
import {
    DrawerOpenStateType,
} from '../../drawer/Drawer.types';

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
    const [dateGrid, setDateGrid] = useState<IDatePickerRow[]>([])

    useEffect(() => {
        const currentDate = new Date()
        const gridData = computeGrid(currentDate.getMonth(), currentDate.getFullYear())
        setDateGrid(gridData)
    }, [])

    return (
        <div className={`date-picker-drawer`}>
            <div className={`date-picker-header `}>
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
                        >
                            {selectedDate?.year}
                        </button>
                    </div>
                    <div className={`month`}>
                        <button
                            type="button"
                            className={`btn-sm-p mr-1`}
                            title={`btn-month-mode`}
                            onClick={() => {}}
                        >
                            {selectedDate?.month}
                        </button>
                    </div>
                    <div className={`day`}>
                        <button
                            type="button"
                            className={`btn-sm-p mr-1`}
                            title={`btn-day-mode`}
                            onClick={() => {}}
                        >
                            {selectedDate?.day}
                        </button>
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
            <div className={`date-picker-body`}>
                {dateGrid.map((dateRow) => (
                    <div key={dateRow.id} className={`date-row`}>
                        {dateRow.cells.map((dateRow) => (
                            <div key={dateRow.id} className={`date-cell`}>
                                {dateRow.id}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DatePickerDrawer
