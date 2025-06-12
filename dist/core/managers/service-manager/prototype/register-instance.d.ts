import { IServiceManager, ServiceIdType } from '../service-manager.types';
export declare const registerInstance: <T>(this: IServiceManager, identifier: ServiceIdType<T>, instance: T) => any;
