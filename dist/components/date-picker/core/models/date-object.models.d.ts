import { INDate } from '../../../../core/framework/schema/descriptor/i-n-date';
import { DatePickerFormatsEnum } from '../date-picker.types';
import { DateObjectTypes } from './date-object.types';
export interface IDateObjectMethods {
    day: () => number;
    month: () => number;
    year: () => number;
    isDefined: () => boolean;
    setFromStrings: (day?: string, month?: string, year?: string) => void;
    setFromNumbers: (day?: number, month?: number, year?: number) => void;
    setFromDate: (date: Date) => void;
    setFromNumber: (date: number) => void;
    setFromObject: (date: INDate) => void;
    setFromString: (date: string, format: DatePickerFormatsEnum) => boolean;
    isNullEmptyOrUndefined?: (dateObject: INDate | undefined | null) => boolean;
    setCurrentDate: (year: number, month: number, day?: number) => void;
    toString: (format: DatePickerFormatsEnum) => string;
    toDate: () => Date;
    toINDate: () => INDate;
    parse: (value: DateObjectTypes) => void;
}
export interface IDateObject extends Partial<IDateObjectMethods> {
    new (date?: Date, name?: string, separator?: string): IDateObject;
    name: string;
    separator: string;
    dateObject: INDate;
    dayOfWeek: number;
}
