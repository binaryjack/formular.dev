import { IBuilderService } from '../input-factory/input-factory';
import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IRadioBaseInput } from '../../input-engine/variants/radio-base/radio-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SRadioInputService: unique symbol;
export interface IRadioInputService extends IBuilderService<IRadioBaseInput> {
    new (sm: IServiceManager): IRadioInputService;
    build: (descriptor: IFieldDescriptor) => IRadioBaseInput;
}
export declare const RadioInputService: IRadioInputService;
