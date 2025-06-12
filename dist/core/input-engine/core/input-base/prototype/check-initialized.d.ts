import { IInputBase } from '../input-base.types';
export interface IInitilizationCheckResult {
    success: boolean;
    errors: string[];
}
export declare const defaultPrecheck: IInitilizationCheckResult;
export declare const checkInitialized: (this: IInputBase) => IInitilizationCheckResult;
