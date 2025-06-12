import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { IFieldDescriptor } from '../../../framework/schema/descriptor/field.descriptor';
import { IFormularManager } from '../formular-manager.types';
export declare const createFromDescriptors: <T extends object>(this: IFormularManager, id: string, descriptors: IFieldDescriptor[]) => IFormular<T> | undefined;
