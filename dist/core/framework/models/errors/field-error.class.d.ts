import { IFieldError } from './i-field-error';
export declare class FieldError extends Error {
    name: string;
    fieldError: IFieldError | undefined;
    constructor(error?: IFieldError | undefined);
    set data(error: IFieldError | undefined);
    get data(): IFieldError | undefined;
}
