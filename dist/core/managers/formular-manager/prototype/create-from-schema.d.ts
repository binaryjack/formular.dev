import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { IEntityScheme } from '../../../framework/schema/field-schema/field.schema.types';
import { IFormularManager } from '../formular-manager.types';
export declare const createFromSchema: <T extends object>(this: IFormularManager, schema: IEntityScheme) => IFormular<T> | undefined;
