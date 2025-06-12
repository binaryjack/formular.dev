import { IServiceManager, ServiceIdType } from '../service-manager.types';
export declare const resolve: <T>(this: IServiceManager, identifier: ServiceIdType<T>, ...parameters: any[]) => T;
