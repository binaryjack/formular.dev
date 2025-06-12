import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { IFormularManager } from '../formular-manager.types';
export declare const getForm: <T extends object>(this: IFormularManager, formId: string) => IFormular<T> | undefined;
