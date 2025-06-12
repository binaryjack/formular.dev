import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { IFormularManager } from '../formular-manager.types';
export declare const createEmpty: <T extends object>(this: IFormularManager, name: string) => IFormular<T> | undefined;
