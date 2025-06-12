import { default as React } from 'react';
export interface IScreenProperties {
    width: number;
    height: number;
    scrollY: number;
    screenTop: number;
    centerScreen: number;
    triggerPoint: number;
    hasUpdates: number;
}
export interface IScrollingContext {
    screenProperties: IScreenProperties;
}
export declare const scrollingContext: IScrollingContext;
export declare const ScrollContextProvider: React.Context<IScrollingContext>;
export declare const useScrollingContext: () => IScrollingContext;
