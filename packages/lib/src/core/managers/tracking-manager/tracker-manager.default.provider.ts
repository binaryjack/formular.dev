import { ITrackingData, ITrackingOutputProvider } from './tracker-manager.types'

export const defaultOutputTrackingProvider = function (this: ITrackingOutputProvider) {
    this.id = 'Console.provider'
    this.func = function (this: ITrackingOutputProvider, data: ITrackingData) {
        switch (data.type) {
            case 'critical':
                throw new Error(
                    `Critical: ${data.source} has thrown a critical exception\n${data.message} `
                )
            case 'error':
                console.error(`Error: ${data.source}\n${data.message} `)
                break
            case 'warning':
                console.warn(`Warning: ${data.source}\n${data.message} `)
                break
            case 'info':
            default:
                if (data.message.includes('unexpected error. p.func is not a function')) {
                    console.log('p.func')
                }
                console.info(`info:${data.source}\n${data.message} `)
                break
        }
    }
    this.funcAll = function (this: ITrackingOutputProvider, data: ITrackingData[]) {
        data?.forEach((d) => {
            this.func(d)
        })
    }
} as any as ITrackingOutputProvider

export const consoleTrackingProvider = new defaultOutputTrackingProvider()
