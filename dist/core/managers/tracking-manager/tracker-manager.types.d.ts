import { IInitializableDependency } from '../initialization-manager/initialization-manager.types';
export declare const STrackingManager: unique symbol;
export declare const STrackingOutputProvider: unique symbol;
export type TrackingType = 'warning' | 'info' | 'error' | 'critical';
export interface ITrackingOutputProvider {
    new (): ITrackingOutputProvider;
    id: string;
    funcAll: (data: ITrackingData[]) => void;
    func: (data: ITrackingData) => void;
}
export interface ITrackingData {
    id: string;
    ts: string;
    type: TrackingType;
    source: string;
    message: string;
}
export declare const newDtId: (dts: ITrackingData[]) => string;
export declare const newTrackingData: (id: string, type: TrackingType, source: string, message: string) => {
    id: string;
    ts: string;
    type: TrackingType;
    source: string;
    message: string;
};
export interface ITrackingManager extends IInitializableDependency {
    new (providers?: ITrackingOutputProvider[]): ITrackingManager;
    _trackingData: ITrackingData[];
    _trackingIsActive: boolean;
    _outputProviders: ITrackingOutputProvider[];
    setTrackingActive: (active: boolean) => void;
    getTrackingDate: () => ITrackingData[];
    addProviders: (providers?: ITrackingOutputProvider[]) => void;
    internalCritical: (source: string, message: string) => void;
    internalError: (source: string, message: string) => void;
    internalWarning: (source: string, message: string) => void;
    internalInfo: (source: string, message: string) => void;
    print: (data: ITrackingData) => void;
    printAll: () => void;
}
