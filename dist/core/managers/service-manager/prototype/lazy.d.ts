import { IServiceManager, ServiceIdType } from '../service-manager.types';
export declare const lazy: <T>(this: IServiceManager, identifier: ServiceIdType<T>, ...parameters: any[]) => () => T;
