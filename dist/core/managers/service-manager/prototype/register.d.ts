import { IServiceManager, IServiceOptions, ServiceFactoryType, ServiceIdType } from '../service-manager.types';
export declare const register: <T>(this: IServiceManager, identifier: ServiceIdType<T>, factory: ServiceFactoryType<T>, options?: IServiceOptions) => any;
