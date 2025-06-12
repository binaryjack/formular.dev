import { LoadingStatus } from '../../../status';
import { IFormular } from '../formular-base.types';
/**
 * Sets the busy status of the Formy instance.
 * @param status - The loading status to set.
 */
export declare const setIsBusy: <T extends object>(this: IFormular<T>, status: LoadingStatus) => void;
