import { createNotificationManagerMock } from '../../../mocks/notification-manager-mock'

describe('NotificationManager Extensions', () => {
    let notificationManager: any

    beforeEach(() => {
        notificationManager = createNotificationManagerMock()
    })

    describe('extend() method', () => {
        it('should fail initially - extend method does not exist yet', () => {
            // This test will FAIL until we implement the extend method
            expect(typeof notificationManager.extend).toBe('function')
        })

        it('should add extension methods to the manager instance', () => {
            // This test will FAIL until we implement the extend method
            const webComponentExtension = {
                showComponentDebug: function (
                    componentId: string,
                    event: string,
                    data: any,
                    level: string = 'info'
                ) {
                    this.componentDebugQueue = this.componentDebugQueue ?? []
                    this.componentDebugQueue.push({
                        componentId,
                        event,
                        data,
                        level,
                        timestamp: Date.now()
                    })
                }
            }

            notificationManager.extend('webComponents', webComponentExtension)

            expect(typeof notificationManager.showComponentDebug).toBe('function')
        })

        it('should track extension names', () => {
            // This test will FAIL until we implement hasExtension method
            const webComponentExtension = {
                showComponentDebug: function (
                    componentId: string,
                    event: string,
                    data: any,
                    level: string = 'info'
                ) {
                    this.componentDebugQueue = this.componentDebugQueue ?? []
                    this.componentDebugQueue.push({
                        componentId,
                        event,
                        data,
                        level,
                        timestamp: Date.now()
                    })
                }
            }

            notificationManager.extend('webComponents', webComponentExtension)

            expect(notificationManager.hasExtension('webComponents')).toBe(true)
            expect(notificationManager.hasExtension('nonExistent')).toBe(false)
        })
    })

    describe('Web Component Notification Extension Methods', () => {
        beforeEach(() => {
            // Add the web component extension for testing
            const webComponentExtension = {
                showComponentDebug: function (
                    this: any,
                    componentId: string,
                    event: string,
                    data: any,
                    level: string = 'info'
                ) {
                    this.componentDebugQueue = this.componentDebugQueue ?? []
                    this.componentDebugQueue.push({
                        componentId,
                        event,
                        data,
                        level,
                        timestamp: Date.now()
                    })
                },
                getComponentNotifications: function (this: any, componentId: string) {
                    const queue = this.componentDebugQueue ?? []
                    return queue.filter(
                        (notification: any) => notification.componentId === componentId
                    )
                },
                notifyLifecycle: function (
                    this: any,
                    componentId: string,
                    phase: string,
                    timing?: number
                ) {
                    const data = { phase, timing: timing ?? performance.now() }
                    this.showComponentDebug(componentId, 'lifecycle', data, 'lifecycle')
                },
                batchComponentNotify: function (
                    this: any,
                    componentId: string,
                    notifications: Array<{ event: string; data: any; level?: string }>
                ) {
                    const batch = notifications.map((notification) => ({
                        componentId,
                        event: notification.event,
                        data: notification.data,
                        level: notification.level ?? 'info',
                        timestamp: Date.now()
                    }))

                    this.componentDebugQueue = this.componentDebugQueue ?? []
                    this.componentDebugQueue.push(...batch)
                },
                clearComponentNotifications: function (this: any, componentId: string) {
                    if (!this.componentDebugQueue) return
                    this.componentDebugQueue = this.componentDebugQueue.filter(
                        (notification: any) => notification.componentId !== componentId
                    )
                }
            }

            // This will fail until extend() is implemented
            try {
                notificationManager.extend('webComponents', webComponentExtension)
            } catch {
                // Expected to fail initially - extend method doesn't exist yet
            }
        })

        it('should show component-specific debug notifications', () => {
            if (typeof notificationManager.extend !== 'function') {
                return // Skip test until extend() is implemented
            }

            const componentId = 'test-component'
            const event = 'property-changed'
            const data = { property: 'value', oldValue: 'old', newValue: 'new' }

            notificationManager.showComponentDebug(componentId, event, data, 'debug')

            const notifications = notificationManager.getComponentNotifications(componentId)
            expect(notifications).toHaveLength(1)
            expect(notifications[0].componentId).toBe(componentId)
            expect(notifications[0].event).toBe(event)
            expect(notifications[0].data).toEqual(data)
            expect(notifications[0].level).toBe('debug')
        })

        it('should track component lifecycle notifications', () => {
            if (typeof notificationManager.extend !== 'function') {
                return
            }

            const componentId = 'lifecycle-component'

            notificationManager.notifyLifecycle(componentId, 'connected')
            notificationManager.notifyLifecycle(componentId, 'attributeChanged', 123.45)
            notificationManager.notifyLifecycle(componentId, 'disconnected')

            const notifications = notificationManager.getComponentNotifications(componentId)
            expect(notifications).toHaveLength(3)

            expect(notifications[0].data.phase).toBe('connected')
            expect(notifications[1].data.phase).toBe('attributeChanged')
            expect(notifications[1].data.timing).toBe(123.45)
            expect(notifications[2].data.phase).toBe('disconnected')
        })

        it('should batch multiple component notifications', () => {
            if (typeof notificationManager.extend !== 'function') {
                return
            }

            const componentId = 'batch-component'
            const notifications = [
                { event: 'event1', data: { test: 1 }, level: 'info' },
                { event: 'event2', data: { test: 2 }, level: 'warn' },
                { event: 'event3', data: { test: 3 } } // default level
            ]

            notificationManager.batchComponentNotify(componentId, notifications)

            const componentNotifications =
                notificationManager.getComponentNotifications(componentId)
            expect(componentNotifications).toHaveLength(3)

            expect(componentNotifications[0].event).toBe('event1')
            expect(componentNotifications[0].level).toBe('info')
            expect(componentNotifications[1].event).toBe('event2')
            expect(componentNotifications[1].level).toBe('warn')
            expect(componentNotifications[2].event).toBe('event3')
            expect(componentNotifications[2].level).toBe('info') // default
        })

        it('should filter notifications by component ID', () => {
            if (typeof notificationManager.extend !== 'function') {
                return
            }

            notificationManager.showComponentDebug('component1', 'event1', { data: 1 })
            notificationManager.showComponentDebug('component2', 'event2', { data: 2 })
            notificationManager.showComponentDebug('component1', 'event3', { data: 3 })

            const component1Notifications =
                notificationManager.getComponentNotifications('component1')
            const component2Notifications =
                notificationManager.getComponentNotifications('component2')

            expect(component1Notifications).toHaveLength(2)
            expect(component2Notifications).toHaveLength(1)

            expect(component1Notifications[0].event).toBe('event1')
            expect(component1Notifications[1].event).toBe('event3')
            expect(component2Notifications[0].event).toBe('event2')
        })

        it('should clear component-specific notifications', () => {
            if (typeof notificationManager.extend !== 'function') {
                return
            }

            notificationManager.showComponentDebug('component1', 'event1', { data: 1 })
            notificationManager.showComponentDebug('component2', 'event2', { data: 2 })
            notificationManager.showComponentDebug('component1', 'event3', { data: 3 })

            expect(notificationManager.getComponentNotifications('component1')).toHaveLength(2)
            expect(notificationManager.getComponentNotifications('component2')).toHaveLength(1)

            notificationManager.clearComponentNotifications('component1')

            expect(notificationManager.getComponentNotifications('component1')).toHaveLength(0)
            expect(notificationManager.getComponentNotifications('component2')).toHaveLength(1) // unchanged
        })
    })
})
