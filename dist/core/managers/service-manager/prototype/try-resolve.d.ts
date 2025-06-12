import { IServiceManager, ServiceIdType } from '../service-manager.types';
export declare const tryResolve: <T>(this: IServiceManager, identifier: ServiceIdType<T>, ...parameters: any[]) => T | undefined;
