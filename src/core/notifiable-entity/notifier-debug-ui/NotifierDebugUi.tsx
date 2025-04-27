import { useEffect, useState } from 'react'
import { IValidationOrigin } from '../../base/validation-strategy/validator.types'
import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotificationAutotrackingData } from '../notifications.types'
import { nnv } from '../utils/new-notification-visitor'
interface INotifierDebugUi {
    internalNotifierInstance: INotifiableEntity
}

interface ITrackLogin {
    functionName: string
    origin: string
    timestamp: string
    data: INotificationAutotrackingData
}

export const NotifierDebugUi = ({ internalNotifierInstance }: INotifierDebugUi) => {
    const [logs, setLogs] = useState<ITrackLogin[]>([])
    const [notifierInstance, setNotifierInstance] = useState<INotifiableEntity | null>(null)

    const handleEvent = (e: any) => {
        const event = e?.data as IValidationOrigin

        const dte = new Date()
        const month = (dte.getMonth?.() + 1)?.toString?.()?.padStart?.(2, '0')
        const day = dte.getDate?.()?.toString?.()?.padStart?.(2, '0')
        const year = dte.getFullYear?.()?.toString?.()
        const hour = dte.getHours?.()?.toString?.()?.padStart?.(2, '0')
        const min = dte.getMinutes?.()?.toString?.()?.padStart?.(2, '0')
        const sec = dte.getSeconds?.()?.toString?.()?.padStart?.(2, '0')

        const ts = `${year}${month}${day}${hour}${min}${sec}`
        const newItem = {
            timestamp: ts,
            functionName: event?.fieldName,
            origin: event?.fieldState
        } as ITrackLogin

        setLogs((_s: any) => {
            return [newItem, ..._s].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
        })
    }

    useEffect(() => {
        setNotifierInstance(internalNotifierInstance)
    }, [internalNotifierInstance])

    useEffect(() => {
        if (!notifierInstance) return
        notifierInstance.accept(
            nnv('DataMutationObserverSubject:created', handleEvent, 'autoTrack_accepted')
        )
        // notifierInstance.accept(
        //     nnv('DataMutationObserverSubject:subscribed', handleEvent, 'changed')
        // )
        // notifierInstance.accept(
        //     nnv('DataMutationObserverSubject:unsubscribed', handleEvent, 'clicked')
        // )
        // notifierInstance.accept(
        //     nnv('DataMutationObserverSubject:triggered', handleEvent, 'autoTrack_subscription')
        // )
        // notifierInstance.accept(
        //     nnv('NotifiableEntity:created', handleEvent, 'autoTrack_subscription')
        // )
        // notifierInstance.accept(
        //     nnv('NotifiableEntity:subscribed', handleEvent, 'autoTrack_subscription')
        // )
        // notifierInstance.accept(
        //     nnv('NotifiableEntity:unsubscribed', handleEvent, 'autoTrack_subscription')
        // )
        // notifierInstance.accept(
        //     nnv('NotifiableEntity:notified', handleEvent, 'autoTrack_subscription')
        // )

        return () => {
            notifierInstance.dispose()
        }
    }, [notifierInstance, logs])

    return (
        <div
            style={{ padding: '1rem', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
            className={`flex flex-col w-full h-[300px]   `}
        >
            <div className={`flex flex-col w-full h-auto overflow-y-scroll  `}>
                <h2>Debug UI</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                Timestamp
                            </th>
                            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Event</th>
                            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                    {log?.timestamp}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                    {log?.origin}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                    {log?.functionName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
