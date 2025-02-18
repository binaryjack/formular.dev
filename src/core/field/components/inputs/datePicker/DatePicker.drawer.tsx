import { useEffect, useState } from 'react';
import {
    FaArrowCircleLeft, FaArrowCircleRight,
} from 'react-icons/fa';


import {
    INDate,
} from '../../../../../dependency/schema/descriptor/field.data.date.struct';
import {
    IDatePickerCell, IDatePickerRow,
} from '../../../datePickerBase/DatePicker.types';
import {
    computeGrid,
} from '../../../datePickerBase/DatePicker.utils';
import {
    DrawerOpenStateType,
} from '../../drawer/Drawer.types';
import DatePickerCell from './DatePicker.cell';

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
    const [dateInfos, setDateInfos] = useState<string>('')
    const [selection, setSelection] = useState<IDatePickerCell[]>([])

    useEffect(() => {
        const currentDate = new Date()
        const gridData = computeGrid(currentDate.getMonth(), currentDate.getFullYear())
        setDateGrid(gridData)
    }, [])

    useEffect(() => {
        if (dateGrid.length === 0) return

        const newArray = [...dateGrid]

        for (const row of newArray) {
            for (const cell of row.cells) {
                if (cell?.item === null) continue
                cell.item.selected = !!selection.find((o) => o.id === cell.id)
            }
        }

        setDateGrid(newArray)
    }, [selection.length])

    const handleDisplayInfos = (cell: IDatePickerCell) => {
        if (cell?.item === null) return

        const day = (cell?.item.date.day?.() ?? 0).toString().padStart(2, '0')
        const month = (cell?.item.date.month?.() ?? 0).toString().padStart(2, '0')
        const year = (cell?.item.date.year?.() ?? 0).toString().padStart(4, '0')
        const dow = cell?.item.date.dayOfWeek.toString()

        setDateInfos(`${year}-${month}-${day}: DOW: ${dow}`)
    }

    const handleSelectedCell = (cell: IDatePickerCell) => {
        if (selection.find((o) => o.id === cell.id)) {
            const newCopy = selection.filter((o) => o.id !== cell.id)
            setSelection(newCopy)
        } else {
            selection.push(cell)
        }
    }

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
                            <DatePickerCell
                                key={dateRow.id}
                                onMouseEnter={handleDisplayInfos}
                                onSelected={handleSelectedCell}
                                item={dateRow}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div>{dateInfos}</div>
        </div>
    )
}

export default DatePickerDrawer
