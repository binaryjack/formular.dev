import { INotification } from '../../../managers/notification-manager/notification-manager.types';
import { IInputBase } from '../input-base/input-base.types';
export type abstractInitializerSignatureType = <TInput extends IInputBase>(fieldInput: TInput, setup?: (fieldInput: TInput) => void, notifiers?: INotification[]) => Promise<boolean>;
export declare const abstractInitializer: abstractInitializerSignatureType;
