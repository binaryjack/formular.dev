import { useCallback, useEffect, useState } from 'react'
import { INotifiableEntity } from '../notifiable-entity-base.types'
import { INotificationAutotrackingData } from '../notifications.types'
import { nnv } from '../utils/new-notification-visitor'
interface INotifierDebugUi {
    internalNotifierInstance: INotifiableEntity
}

export const NotifierDebugUi = ({ internalNotifierInstance }: INotifierDebugUi) => {
    const [logs, setLogs] = useState<INotificationAutotrackingData[]>([])
    const [notifierInstance, setNotifierInstance] = useState<INotifiableEntity | null>(null)

    const handleEvent = useCallback((event: any) => {
        setLogs((logs) => [{ timestamp: new Date().toISOString(), ...event }, ...logs])
    }, [])

    useEffect(() => {
        setNotifierInstance(internalNotifierInstance)
    }, [internalNotifierInstance])

    useEffect(() => {
        if (!notifierInstance) return
        notifierInstance.accept(
            nnv('DataMutationObserverSubject:created', handleEvent, 'autoTrack_accepted')
        )
        notifierInstance.accept(
            nnv('DataMutationObserverSubject:subscribed', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('DataMutationObserverSubject:unsubscribed', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('DataMutationObserverSubject:triggered', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('NotifiableEntity:created', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('NotifiableEntity:subscribed', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('NotifiableEntity:unsubscribed', handleEvent, 'autoTrack_subscription')
        )
        notifierInstance.accept(
            nnv('NotifiableEntity:notified', handleEvent, 'autoTrack_subscription')
        )

        return () => {
            notifierInstance.dispose()
        }
    }, [notifierInstance])

    return (
        <div
            style={{ padding: '1rem', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
            className={`flex flex-col w-full h-full`}
        >
            <h2>Debug UI</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Timestamp</th>
                        <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Event</th>
                        <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                {log.data?.timestamp}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                {log.data?.event}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                                {JSON.stringify(log)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
