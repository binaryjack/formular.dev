import { ServiceIdType } from '../service-manager.types';
export interface IServiceLocator {
    get<T>(identifier: ServiceIdType<T>): T;
    tryGet<T>(identifier: ServiceIdType<T>): T | undefined;
    lazy<T>(identifier: ServiceIdType<T>): () => T;
}
export declare const ServiceLocator: IServiceLocator;
