import { TabManager } from '@components/smart-tab/manager/tab-manager'
import { ITab } from '@components/smart-tab/types/i-tab'
import { notification, NotificationManager } from 'formular.dev.lib'
import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react'

const notificationManagerInstance = new NotificationManager()

export const useTabs = <T extends ITab>(tabs: T[]) => {
    const tabManager = useMemo(() => {
        const tabManager = new TabManager(tabs)
        tabManager.notificationManager = notificationManagerInstance
        return tabManager
    }, [tabs])

    const lastSnapshotRef = useRef<number>(tabManager.getHash())

    const subscribe = useCallback(
        (callback: () => void) => {
            if (!tabs) {
                return () => {}
            }

            const notif = notification(
                tabs,
                callback,
                'onUiUpdate',
                'useField.onUiUpdate',
                'useField'
            )

            tabManager.notificationManager.accept(notif)

            const key = tabs.reduce<string>((acc: string, item) => {
                acc = `${acc}-${item.label}`
                return acc
            }, '')
            console.log('useTabs subscribing to tabs:', key)

            return () => {
                console.log('useField unsubscribing from field:', key)
                tabManager.notificationManager?.observers.unSubscribe(callback, false)
                tabManager.notificationManager?.dismiss(notif)
            }
        },
        [tabs, tabManager.getHash()]
    )

    // Snapshot function for useSyncExternalStore - must return stable references
    const getSnapshot = useCallback(() => {
        if (!tabs) {
            return () => {}
        }
        const lastSnapshot = lastSnapshotRef.current
        const newHash = tabManager.getHash()
        const hasChanges = newHash !== lastSnapshot

        if (hasChanges) {
            console.log('useTabs getSnapshot - flags changed for newHash:', 'new flags:')
            lastSnapshotRef.current = newHash
        }

        return lastSnapshotRef.current
    }, [tabs, tabManager.getHash()])

    const hashPrint = useSyncExternalStore(subscribe, getSnapshot)
    return {
        tabManager,
        hashPrint
    }
}
