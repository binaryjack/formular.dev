export interface IAssertor {
    isTrue: boolean;
    message: string;
}
export declare const newAssert: (isTrue: boolean, message: string) => {
    isTrue: boolean;
    message: string;
};
export interface IExceptionManager {
    new (...assertions: IAssertor[]): IExceptionManager;
    accept: (assertion: IAssertor) => void;
    assertors: IAssertor[];
    errors: string[];
    hasErrors: () => boolean;
    process: () => void;
    toString: () => string;
}
export declare const accept: (this: IExceptionManager, assertion: IAssertor) => void;
export declare const hasErrors: (this: IExceptionManager) => boolean;
export declare const toString: (this: IExceptionManager) => string;
export declare const process: (this: IExceptionManager) => void;
export declare const ExceptionManager: IExceptionManager;
