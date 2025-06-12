import { IServiceManager } from '../service-manager.types';
export declare function demonstrateLazyResolution(): void;
export declare function useExampleWithLazy(): void;
export declare function createServiceWithLazyDependency(sm: IServiceManager): {
    doSomething(): string;
};
