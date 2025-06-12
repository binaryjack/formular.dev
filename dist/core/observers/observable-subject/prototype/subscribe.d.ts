import { IObservableSubject, TObservableFunction } from '../observable-subject.types';
/**
 * Adds one or more observer functions to the list of observers.
 *
 * @param fns - The observer functions to add.
 */
export declare function subscribe<T = any>(this: IObservableSubject<T>, obs: TObservableFunction<T>, useWeak?: boolean): void;
