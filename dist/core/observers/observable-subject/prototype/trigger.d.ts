import { IObservableSubject } from '../observable-subject.types';
/**
 * Executes all observer functions in the list of observers.
 */
export declare function trigger<T = any>(this: IObservableSubject): void;
