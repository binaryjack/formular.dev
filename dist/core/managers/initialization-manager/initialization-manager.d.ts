import { IConfiguration } from '../../../project/provider/configuration/i-configuration';
import { IInitializationDelegate } from './delegates/initialization-delegate';
export interface IInitializationManager {
    new (params: IConfiguration): IInitializationManager;
    params: IConfiguration;
    initializer?: IInitializationDelegate;
    addInitializer: (name: string, initializer: (params: IConfiguration) => void) => void;
    executeSequences: () => void;
}
export declare const addInitializer: (this: IInitializationManager, name: string, initializer: (params: IConfiguration) => void) => void;
export declare const executeSequences: (this: IInitializationManager) => void;
export declare const InitializationManager: IInitializationManager;
