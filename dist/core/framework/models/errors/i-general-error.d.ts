import { IApiError } from './i-api-error';
import { IFieldError } from './i-field-error';
export interface IGeneralError {
    id: number;
    origin: string;
    message: string;
    data: IFieldError | IApiError;
}
