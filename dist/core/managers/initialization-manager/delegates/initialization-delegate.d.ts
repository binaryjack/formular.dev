import { IConfiguration } from '../../../../project/provider/configuration/i-configuration';
import { IInitializationManager } from '../initialization-manager';
export interface IInitializationDelegate {
    new (name: string, manager: IInitializationManager, intitializer: (params: IConfiguration) => void): IInitializationDelegate;
    name: string;
    manager: IInitializationManager;
    next?: IInitializationDelegate;
    intitializer: (params: IConfiguration) => void;
    execute?: () => void;
    setNextSequence?: (sequenceInitliaizer: IInitializationDelegate) => void;
}
export declare const execute: (this: IInitializationDelegate) => void;
export declare const setNext: (this: IInitializationDelegate, initializerDelegate: IInitializationDelegate) => void;
export declare const InitializationDelegate: IInitializationDelegate;
