import { IObservableSubject, TObservableFunction } from '../observable-subject.types';
/**
 * Removes one or more observer functions from the list of observers.
 *
 * @param fns - The observer functions to remove.
 */
export declare function unSubscribe<T = any>(this: IObservableSubject, fn: TObservableFunction<T>, forWeak: boolean): void;
