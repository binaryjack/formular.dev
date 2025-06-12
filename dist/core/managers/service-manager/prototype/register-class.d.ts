import { IServiceManager, IServiceOptions, ServiceIdType } from '../service-manager.types';
export declare const registerClass: <T>(this: IServiceManager, identifier: ServiceIdType<T>, constructor: new (...args: any[]) => T, options?: IServiceOptions) => any;
