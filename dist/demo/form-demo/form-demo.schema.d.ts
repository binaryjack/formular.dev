import { IEntityScheme } from '../../core/framework/schema/field-schema/field.schema.types';
export interface IFormOutput {
    id: number;
    order: number;
    showRooms: string[];
    inputText: string;
    selectOptionsTest: string;
    selectedRadioId: string;
    check: boolean;
    date: string;
    rte: string;
    rangeSlider: number;
    userId: string;
    password: string;
    toggle: boolean;
    toggle2: boolean;
}
export declare enum FormOutputFieldsNames {
    Id = "id",
    Order = "order",
    ShowRooms = "showRooms",
    InputText = "inputText",
    SelectOptionsTest = "selectOptionsTest",
    SelectedRadioId = "selectedRadioId",
    Check = "check",
    Date = "date",
    Rte = "rte",
    RangeSlider = "rangeSlider",
    UserId = "userId",
    Password = "password",
    Toggle = "toggle",
    Toggle2 = "toggle2"
}
export declare const formOutput: IFormOutput;
export declare const controlsDemoSchema: IEntityScheme;
