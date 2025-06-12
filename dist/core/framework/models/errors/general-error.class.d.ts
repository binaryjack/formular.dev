import { IGeneralError } from './i-general-error';
export type GeneralErrorType = 'FieldError' | 'ApiError';
export declare class GeneralError extends Error {
    id: number;
    name: string;
    origin: string;
    innerError: GeneralErrorType | undefined;
    constructor(origin: string, message?: string, inner?: GeneralErrorType, id?: number);
    set data(error: GeneralErrorType | undefined);
    get data(): GeneralErrorType | undefined;
    get toGI(): IGeneralError;
}
