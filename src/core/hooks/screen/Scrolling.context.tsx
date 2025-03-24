import React from 'react'

export interface IScreenProperties {
    width: number
    height: number
    scrollY: number

    screenTop: number
    centerScreen: number
    triggerPoint: number

    hasUpdates: number
}

export interface IScrollingContext {
    screenProperties: IScreenProperties
}

export const scrollingContext: IScrollingContext = {
    screenProperties: {} as IScreenProperties
}

export const ScrollContextProvider = React.createContext<IScrollingContext>(scrollingContext)

export const useScrollingContext = () => {
    return React.useContext(ScrollContextProvider)
}
