import { IFieldDescriptor } from '../../core/framework/schema/descriptor/field.descriptor';
import { IServiceManager } from '../../core/managers/service-manager/service-manager.types';
export declare const SFieldDescriptorService: unique symbol;
export interface IFieldDescriptorService {
    new (sm: IServiceManager): IFieldDescriptorService;
    descriptors: IFieldDescriptor[];
    getDescriptorByName: (name: string) => IFieldDescriptor | undefined;
    getDescriptorById: (id: number) => IFieldDescriptor | undefined;
    setFieldDescriptor: (descriptor: IFieldDescriptor) => void;
    reset: () => void;
}
export declare const FieldDescriptorService: IFieldDescriptorService;
