import { IServiceLocator } from '../service-locator/service-locator';
import { IServiceManager } from '../service-manager.types';
export interface IAbstractServiceBase {
    new (serviceManager: IServiceManager): IAbstractServiceBase;
    serviceLocator: IServiceLocator;
    serviceManager: IServiceManager;
}
export declare const AbstractServiceBase: (this: IAbstractServiceBase, serviceManager: IServiceManager) => void;
