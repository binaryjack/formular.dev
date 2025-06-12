import { IApiError } from './i-api-error';
export declare class ApiError extends Error {
    name: string;
    apiError: IApiError | undefined;
    constructor(error: IApiError | undefined);
    set data(error: IApiError | undefined);
    get data(): IApiError | undefined;
}
