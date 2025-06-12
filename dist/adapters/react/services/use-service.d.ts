import { ServiceIdType } from '../../../core/managers/service-manager/service-manager.types';
export declare const useService: () => {
    getService: <T>(identifier: ServiceIdType<T>) => T | undefined;
};
