import { IServiceManager, ServiceIdType } from '../service-manager.types';
export declare const isRegistered: <T>(this: IServiceManager, identifier: ServiceIdType<T>) => boolean;
