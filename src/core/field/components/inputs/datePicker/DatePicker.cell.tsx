import React from 'react';


import {
    IDatePickerCell,
} from '../../../datePickerBase/DatePicker.types';

interface IDatePickerCellProps {
    item: IDatePickerCell
    onMouseEnter: (item: IDatePickerCell) => void
    onSelected: (item: IDatePickerCell) => void
}

const DatePickerCell: React.FC<IDatePickerCellProps> = ({ item, onMouseEnter, onSelected }) => {
    const handleMouseEnter = () => {
        onMouseEnter(item)
    }

    const handleClick = () => {
        onSelected(item)
    }

    return (
        <div
            className={`date-cell ${item.item?.selected ? 'selected' : ''}`}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
        >
            {item.id}
        </div>
    )
}

export default DatePickerCell
