import { IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { useEffect, useState } from 'react'
import { INotificationManager } from '../notification-manager-base.types'
import { nnv } from '../utils/new-notification-visitor'
interface INotifierDebugUi {
    internalNotifierInstance: INotificationManager
}

interface ITrackLog {
    timestamp: string
    event?: IEvents
}

export const NotifierDebugUi = ({ internalNotifierInstance }: INotifierDebugUi) => {
    const [logs, setLogs] = useState<ITrackLog[]>([])
    const [notifierInstance, setNotifierInstance] = useState<INotificationManager | null>(null)

    const handleEvent = <T extends IEvents>(e?: T) => {
        const dte = new Date()
        const month = (dte.getMonth?.() + 1)?.toString?.()?.padStart?.(2, '0')
        const day = dte.getDate?.()?.toString?.()?.padStart?.(2, '0')
        const year = dte.getFullYear?.()?.toString?.()
        const hour = dte.getHours?.()?.toString?.()?.padStart?.(2, '0')
        const min = dte.getMinutes?.()?.toString?.()?.padStart?.(2, '0')
        const sec = dte.getSeconds?.()?.toString?.()?.padStart?.(2, '0')

        const ts = `${year}${month}${day}${hour}${min}${sec}`
        const newItem: ITrackLog = {
            timestamp: ts,
            event: e
        }

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
            nnv(
                newEvent(
                    'DataMutationObserverSubject:created',
                    'useField.accept',
                    'onAutoTrackNotified',
                    `auto.tracking.notification`
                ),
                handleEvent
            )
        )

        return () => {
            notifierInstance.dispose()
        }
    }, [notifierInstance, logs])

    return (
        <div
            style={{ padding: '0.11rem', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}
            className={`flex flex-col w-full h-[315px] text-[9px]  `}
        >
            <div className={`flex flex-col w-full h-auto overflow-y-scroll  `}>
                <h2>Debug UI</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '0.1rem',
                                    width: '70px'
                                }}
                            >
                                Timestamp
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '0.1rem',
                                    width: '50px'
                                }}
                            >
                                Origin
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '0.1rem',
                                    width: '50px'
                                }}
                            >
                                Emitter Func
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '0.1rem',
                                    width: '50px'
                                }}
                            >
                                Target Func
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '0.1rem',
                                    width: '180px'
                                }}
                            >
                                Data
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.timestamp}>
                                <td style={{ border: '1px solid #ddd', padding: '0.1rem' }}>
                                    {log?.timestamp}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.1rem' }}>
                                    {log?.event?.fieldName}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.1rem' }}>
                                    {log?.event?.emitterName}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.1rem' }}>
                                    {log?.event?.target}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '0.1rem' }}>
                                    {log?.event?.toFlags?.() ?? ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
