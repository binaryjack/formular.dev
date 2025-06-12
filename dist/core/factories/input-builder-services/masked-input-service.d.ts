import { IFieldDescriptor } from '../../framework/schema/descriptor/field.descriptor';
import { IBuilderService } from '../input-factory/input-factory';
import { IMaskedBaseInput } from '../../input-engine/variants/masked-base/masked-base-input.types';
import { IServiceManager } from '../../managers/service-manager/service-manager.types';
export declare const SMaskedInputService: unique symbol;
export interface IMaskedInputService extends IBuilderService<IMaskedBaseInput> {
    new (sm: IServiceManager): IMaskedInputService;
    build: (descriptor: IFieldDescriptor) => IMaskedBaseInput;
}
export declare const MaskedInputService: IMaskedInputService;
