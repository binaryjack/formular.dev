import { IServiceManager, ServiceIdType } from '../../service-manager.types';
export interface ILazyDependencyProxy<T> {
    new (identifier: ServiceIdType<T>, container: IServiceManager, dependency: ServiceIdType<any>): any;
    container: IServiceManager;
    resolvedDependency: any;
    isResolved: boolean;
    dependency: ServiceIdType<any>;
    proxy: () => ProxyHandler<any>;
    identifier: ServiceIdType<T>;
    get: (target: any, prop: PropertyKey, receiver: any) => any;
    set: (target: any, prop: PropertyKey, value: any) => boolean;
    has: (target: any, prop: PropertyKey) => boolean;
    ownKeys: (target: any) => ArrayLike<string | symbol>;
    getOwnPropertyDescriptor: (target: any, prop: PropertyKey) => PropertyDescriptor | undefined;
}
export declare const LazyDependencyProxy: ILazyDependencyProxy<any>;
