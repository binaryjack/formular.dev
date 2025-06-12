import { DatePickerFormatsEnum } from './core/date-picker.types';
interface DatePickerSFProps {
    fieldName: string;
    separator?: string;
    dataFormat?: DatePickerFormatsEnum;
    displayFormat?: DatePickerFormatsEnum;
}
export declare const DatePickerSF: ({ fieldName, separator, dataFormat, displayFormat }: DatePickerSFProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
