import { ITracker, TrackingType } from '../tracker/tracker.types'

export const generalExceptionHandler = function (
    tracker: ITracker | undefined,
    type: TrackingType,
    source: string,
    message: string
) {
    try {
        if (!tracker) {
            _messageConsoleFactory(type, source, message)
            return
        }
        _messageTrackerFactory(tracker, type, source, message)
    } catch (e: any) {
        console.error(`${generalExceptionHandler.name}: unexpected error. ${e?.message}`)
    }
}

const _messageConsoleFactory = (type: TrackingType, source: string, message: string) => {
    switch (type) {
        case 'critical':
            throw Error(`${source}: ${message}`)
        case 'warning':
            console.warn(`${source}: ${message}`)
            break
        case 'error':
            console.error(`${source}: ${message}`)
            break
        case 'info':
        default:
            console.info(`${source}: ${message}`)
            break
    }
}

const _messageTrackerFactory = (
    tracker: ITracker,
    type: TrackingType,
    source: string,
    message: string
) => {
    switch (type) {
        case 'critical':
            tracker.internalCritical(source, message)
            break
        case 'error':
            tracker.internalError(source, message)
            break
        case 'warning':
            tracker.internalWarning(source, message)
            break
        case 'info':
        default:
            tracker.internalInfo(source, message)
            break
    }
}
