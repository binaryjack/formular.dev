/**
 * FORMULAR - Enhanced Notification Manager Tests
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Critical tests for the reactive notification system
 */

import { NotificationManager } from '@core/managers/notification-manager/notification-manager'
import { ObservableSubject } from '@core/observers/observable-subject/observable-subject'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'

describe('NotificationManager', () => {
    let notificationManager: INotificationManager

    beforeEach(() => {
        // @ts-ignore - Testing protected constructor
        notificationManager = new (NotificationManager as any)()
        notificationManager.initialize('test-manager')
    })

    afterEach(() => {
        if (notificationManager && typeof notificationManager.dispose === 'function') {
            notificationManager.dispose()
        }
    })

    describe('Initialization', () => {
        it('should initialize with default properties', () => {
            // @ts-ignore
            const manager = new (NotificationManager as any)()
            expect(manager.autoTracker).toBeUndefined()
            expect(manager.notifiers).toBeInstanceOf(Map)
            expect(manager.observers).toBeInstanceOf(ObservableSubject)
            expect(manager.batchQueue).toEqual([])
            expect(manager.priorityQueues).toBeInstanceOf(Map)
            expect(manager.isBatchScheduled).toBe(false)
            expect(manager.batchTimeout).toBeNull()
            expect(manager.batchConfig).toEqual({
                maxBatchSize: 50,
                batchDelay: 16,
                enablePriority: true,
                strategy: 'microtask'
            })
            expect(manager.dependencyName).toBe('')
        })

        it('should initialize successfully with all required methods', () => {
            expect(notificationManager).toBeDefined()
            expect(typeof notificationManager.notify).toBe('function')
            expect(typeof notificationManager.accept).toBe('function')
            expect(typeof notificationManager.dismiss).toBe('function')
            expect(typeof notificationManager.batchNotify).toBe('function')
            expect(typeof notificationManager.trigger).toBe('function')
        })

        it('should have proper dependency name after initialization', () => {
            expect(notificationManager.dependencyName).toBe('test-manager')
        })
    })

    describe('Basic Notification Functionality', () => {
        it('should notify with valid event types', () => {
            // Arrange & Act & Assert
            expect(() => notificationManager.notify('onChange')).not.toThrow()
            expect(() => notificationManager.notify('onSubmit')).not.toThrow()
            expect(() => notificationManager.notify('onBlur')).not.toThrow()
        })

        it('should handle notify with data', () => {
            // Arrange & Act & Assert
            expect(() => notificationManager.notify('onChange', { value: 'test' })).not.toThrow()
        })

        it('should trigger notifications', () => {
            // Act & Assert
            expect(() => notificationManager.trigger()).not.toThrow()
        })
    })

    describe('Batch Notification System', () => {
        it('should support batch notifications with valid events', () => {
            // Arrange
            const notifications = [
                { type: 'onChange' as const, data: { value: 1 } },
                { type: 'onSubmit' as const, data: { value: 2 } }
            ]
            
            // Act & Assert
            expect(() => notificationManager.batchNotify(notifications)).not.toThrow()
        })

        it('should handle empty batch notifications', () => {
            // Act & Assert
            expect(() => notificationManager.batchNotify([])).not.toThrow()
        })

        it('should flush pending notifications', () => {
            // Act & Assert
            expect(() => notificationManager.flushPendingNotifications()).not.toThrow()
        })

        it('should allow setting batch configuration', () => {
            // Arrange
            const batchConfig = {
                maxBatchSize: 100,
                batchDelay: 50,
                enablePriority: false,
                strategy: 'timeout' as const
            }
            
            // Act & Assert
            expect(() => notificationManager.setBatchConfig(batchConfig)).not.toThrow()
        })
    })

    describe('Debounced Notifications', () => {
        it('should support debounced notifications', () => {
            // Act & Assert
            expect(() => notificationManager.debounceNotify('onChange', 100)).not.toThrow()
            expect(() => notificationManager.debounceNotify('onSubmit', 50, { value: 'test' })).not.toThrow()
        })
    })

    describe('Observer Management', () => {
        it('should have registered notifier names functionality', () => {
            // Act
            const notifierNames = notificationManager.getRegisteredNotifierNames()
            
            // Assert
            expect(Array.isArray(notifierNames)).toBe(true)
        })

        it('should handle accept and dismiss operations', () => {
            // Arrange
            const mockNotification = {
                key: 'test-notification',
                data: { test: 'value' }
            }
            
            // Act & Assert
            expect(() => notificationManager.accept(mockNotification)).not.toThrow()
            expect(() => notificationManager.dismiss(mockNotification)).not.toThrow()
        })
    })

    describe('Performance and Memory Management', () => {
        it('should dispose properly', () => {
            // Act & Assert
            expect(() => notificationManager.dispose()).not.toThrow()
        })

        it('should handle multiple batch operations', () => {
            // Arrange
            const multipleNotifications = Array.from({ length: 10 }, (_, i) => ({
                type: 'onChange' as const,
                data: { value: i }
            }))
            
            // Act & Assert
            expect(() => notificationManager.batchNotify(multipleNotifications)).not.toThrow()
        })
    })

    describe('Extension System', () => {
        it('should support extension functionality', () => {
            // Arrange
            const extensionName = 'test-extension'
            const extensionData = { test: 'extension' }
            
            // Act & Assert
            expect(() => notificationManager.extend(extensionName, extensionData)).not.toThrow()
            expect(notificationManager.hasExtension(extensionName)).toBe(true)
        })

        it('should check for non-existent extensions', () => {
            // Act & Assert
            expect(notificationManager.hasExtension('non-existent-extension')).toBe(false)
        })
    })

    describe('Error Handling', () => {
        it('should handle null/undefined data gracefully', () => {
            // Act & Assert
            expect(() => notificationManager.notify('onChange', null as any)).not.toThrow()
            expect(() => notificationManager.notify('onSubmit', undefined as any)).not.toThrow()
        })

        it('should handle batch configuration edge cases', () => {
            // Act & Assert
            expect(() => notificationManager.setBatchConfig(null as any)).not.toThrow()
            expect(() => notificationManager.setBatchConfig(undefined as any)).not.toThrow()
        })

        it('should handle debounce with zero delay', () => {
            // Act & Assert
            expect(() => notificationManager.debounceNotify('onChange', 0)).not.toThrow()
        })
    })
})
        expect(manager.isInitialized).toBe(false)
    })

    it('should allow setting autoTracker', () => {
        // @ts-ignore
        const auto = {} as any
        // @ts-ignore
        const manager = new (NotificationManager as any)(auto)
        expect(manager.autoTracker).toBe(auto)
    })
})
