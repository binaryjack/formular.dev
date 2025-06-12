import { IObservableSubject } from './observable-subject.types';
/**
 * Creates a new DataMutationObserverSubject instance.
 *
 * @param this - The context object which will hold the observers.
 * @param fns - A list of observable functions to be added as observers.
 *
 * @remarks
 * This function initializes the `observers` property with the provided functions.
 *
 * @example
 * ```typescript
 * const observer1 = () => { console.log('Observer 1'); };
 * const observer2 = () => { console.log('Observer 2'); };
 * const subject = new DataMutationObserverSubject(observer1, observer2);
 * ```
 */
export declare const ObservableSubject: IObservableSubject;
