import { ITrackingManager, TrackingType } from '../tracking-manager/tracker-manager.types'

export const logManager = function (
    tracker: ITrackingManager | undefined,
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
        console.error(`${logManager.name}: unexpected error. ${e?.message}`)
    }
}

const _messageConsoleFactory = (type: TrackingType, source: string, message: string) => {
    switch (type) {
        case 'critical':
            // For critical, log and throw to interrupt execution as intended
            console.error(`CRITICAL - ${source}: ${message}`)
            throw Error(`${source}: ${message}`)
        case 'warning':
            console.warn(`${source}: ${message}`)
            break
        case 'error':
            console.error(`${source}: ${message}`)
            break
        case 'info':
            console.info(`${source}: ${message}`)
            break
        default:
            assertNever(type)
    }
}

function assertNever(x: never): never {
    throw new Error(`Unhandled TrackingType: ${x}`)
}

const _messageTrackerFactory = (
    tracker: ITrackingManager,
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
            tracker.internalInfo(source, message)
            break
        default:
            assertNever(type)
    }
}
