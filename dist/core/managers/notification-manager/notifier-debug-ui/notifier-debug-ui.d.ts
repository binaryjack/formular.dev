import { INotificationManager } from '../notification-manager-base.types';
interface INotifierDebugUi {
    internalNotifierInstance?: INotificationManager;
}
export declare const NotifierDebugUi: ({ internalNotifierInstance }: INotifierDebugUi) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
