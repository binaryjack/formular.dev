/**
 * Notification Extensions for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Extends NotificationManager with web component specific functionality:
 * - Component-specific notifications
 * - Debug mode for development
 * - Batch notifications for performance
 * - Component lifecycle notifications
 * - Error/warning categorization by component
 */

/**
 * Log level types
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

/**
 * Notification types
 */
type NotificationType = 'lifecycle' | 'debug' | 'error' | 'warning' | 'info'

/**
 * Lifecycle phases
 */
type LifecyclePhase = 'created' | 'connected' | 'disconnected' | 'attributeChanged'

/**
 * Component notification configuration
 */
interface ComponentNotificationConfig {
    componentId: string
    enableDebug: boolean
    logLevel: LogLevel
    maxHistorySize: number
    batchSize: number
    batchTimeout: number
}

/**
 * Component notification entry
 */
interface ComponentNotification {
    id: string
    componentId: string
    type: NotificationType
    message: string
    data?: any
    timestamp: Date
    level: LogLevel
}

/**
 * Batch notification queue
 */
interface BatchQueue {
    componentId: string
    notifications: ComponentNotification[]
    timeout?: number
}

/**
 * Web Component Notification Extensions
 * These methods extend the NotificationManager with web component specific capabilities
 */
export const WebComponentNotificationExtensions = {
    // Component notification registry
    _componentConfigs: new Map<string, ComponentNotificationConfig>(),
    _notificationHistory: new Map<string, ComponentNotification[]>(),
    _batchQueues: new Map<string, BatchQueue>(),
    _globalDebugMode: false,
    _notificationId: 0,

    /**
     * Configures notification settings for a component
     * @param componentId - Unique identifier for the component
     * @param config - Notification configuration options
     */
    configureComponent: function(componentId: string, config: Partial<ComponentNotificationConfig>): void {
        const defaultConfig: ComponentNotificationConfig = {
            componentId,
            enableDebug: this._globalDebugMode,
            logLevel: 'info',
            maxHistorySize: 100,
            batchSize: 10,
            batchTimeout: 100
        }

        const finalConfig = { ...defaultConfig, ...config }
        this._componentConfigs.set(componentId, finalConfig)
        
        // Initialize history for component
        if (!this._notificationHistory.has(componentId)) {
            this._notificationHistory.set(componentId, [])
        }
    },

    /**
     * Shows component-specific debug information
     * @param componentId - The component identifier
     * @param event - The event or operation being debugged
     * @param data - Additional debug data
     * @param level - Debug level (default: 'debug')
     */
    showComponentDebug: function(
        componentId: string,
        event: string,
        data?: any,
        level: LogLevel = 'debug'
    ): void {
        const config = this._componentConfigs.get(componentId)
        
        // Check if debug is enabled for this component
        if (!config?.enableDebug && !this._globalDebugMode) {
            return
        }

        const notification: ComponentNotification = {
            id: `${componentId}-${++this._notificationId}`,
            componentId,
            type: 'debug',
            message: `[${componentId}] ${event}`,
            data,
            timestamp: new Date(),
            level
        }

        this._addNotificationToHistory(componentId, notification)
        
        // Log to console in debug mode
        if (this._globalDebugMode || config?.enableDebug) {
            const logMethod = level === 'error' ? console.error : 
                            level === 'warn' ? console.warn : 
                            level === 'info' ? console.info : console.log

            logMethod(`[${componentId}] ${event}`, data ?? '')
        }
    },

    /**
     * Sends multiple notifications in a batch for performance
     * @param notifications - Array of notifications to send
     */
    batchNotify: function(notifications: ComponentNotification[]): void {
        // Group notifications by component
        const componentGroups = new Map<string, ComponentNotification[]>()
        
        for (const notification of notifications) {
            if (!componentGroups.has(notification.componentId)) {
                componentGroups.set(notification.componentId, [])
            }
            componentGroups.get(notification.componentId)!.push(notification)
        }

        // Process each component group
        for (const [componentId, groupNotifications] of componentGroups) {
            this._processComponentBatch(componentId, groupNotifications)
        }
    },

    /**
     * Queues a notification for batched processing
     * @param componentId - The component identifier
     * @param notification - The notification to queue
     */
    queueNotification: function(componentId: string, notification: ComponentNotification): void {
        const config = this._componentConfigs.get(componentId)
        if (!config) {
            // Send immediately if no config
            this._addNotificationToHistory(componentId, notification)
            return
        }

        let batchQueue = this._batchQueues.get(componentId)
        if (!batchQueue) {
            batchQueue = {
                componentId,
                notifications: []
            }
            this._batchQueues.set(componentId, batchQueue)
        }

        batchQueue.notifications.push(notification)

        // Process batch if it reaches the batch size
        if (batchQueue.notifications.length >= config.batchSize) {
            this._processBatchQueue(componentId)
        } else {
            // Set timeout for batch processing
            if (batchQueue.timeout) {
                clearTimeout(batchQueue.timeout)
            }
            
            batchQueue.timeout = setTimeout(() => {
                this._processBatchQueue(componentId)
            }, config.batchTimeout) as any
        }
    },

    /**
     * Gets notifications for a specific component
     * @param componentId - The component identifier
     * @param limit - Maximum number of notifications to return
     * @returns Array of component notifications
     */
    getComponentNotifications: function(componentId: string, limit?: number): ComponentNotification[] {
        const history = this._notificationHistory.get(componentId) ?? []
        
        if (limit) {
            return history.slice(-limit)
        }
        
        return [...history]
    },

    /**
     * Notifies about component lifecycle events
     * @param componentId - The component identifier
     * @param phase - Lifecycle phase ('created', 'connected', 'disconnected', 'attributeChanged')
     * @param timing - Optional timing information
     * @param data - Additional lifecycle data
     */
    notifyLifecycle: function(
        componentId: string,
        phase: LifecyclePhase,
        timing?: { start: number, end: number },
        data?: any
    ): void {
        const notification: ComponentNotification = {
            id: `${componentId}-lifecycle-${++this._notificationId}`,
            componentId,
            type: 'lifecycle',
            message: `Lifecycle: ${phase}`,
            data: {
                phase,
                timing,
                ...data
            },
            timestamp: new Date(),
            level: 'info'
        }

        this._addNotificationToHistory(componentId, notification)
        
        // Debug lifecycle in debug mode
        if (this._globalDebugMode) {
            const timingInfo = timing ? ` (${timing.end - timing.start}ms)` : ''
            console.log(`🔄 [${componentId}] Lifecycle: ${phase}${timingInfo}`, data ?? '')
        }
    },

    /**
     * Sets global debug mode for all components
     * @param enabled - Whether to enable global debug mode
     */
    setGlobalDebugMode: function(enabled: boolean): void {
        this._globalDebugMode = enabled
        
        // Update all existing component configs
        for (const [componentId, config] of this._componentConfigs) {
            config.enableDebug = enabled
        }

        console.log(`🐛 Web Components Debug Mode: ${enabled ? 'ON' : 'OFF'}`)
    },

    /**
     * Gets debug mode status
     * @returns Whether global debug mode is enabled
     */
    isDebugMode: function(): boolean {
        return this._globalDebugMode
    },

    /**
     * Clears notification history for a component
     * @param componentId - The component identifier (optional, clears all if not provided)
     */
    clearNotificationHistory: function(componentId?: string): void {
        if (componentId) {
            this._notificationHistory.delete(componentId)
        } else {
            this._notificationHistory.clear()
        }
    },

    /**
     * Gets notification statistics for debugging
     * @returns Object containing notification statistics
     */
    getNotificationStats: function(): any {
        const stats = {
            totalComponents: this._componentConfigs.size,
            globalDebugMode: this._globalDebugMode,
            componentsWithHistory: this._notificationHistory.size,
            activeBatchQueues: this._batchQueues.size,
            notificationsByComponent: {} as Record<string, number>,
            notificationsByType: {} as Record<string, number>
        }

        // Count notifications by component and type
        for (const [componentId, history] of this._notificationHistory) {
            stats.notificationsByComponent[componentId] = history.length

            for (const notification of history) {
                stats.notificationsByType[notification.type] = 
                    (stats.notificationsByType[notification.type] ?? 0) + 1
            }
        }

        return stats
    },

    /**
     * Internal method to add notification to history
     * @private
     */
    _addNotificationToHistory: function(componentId: string, notification: ComponentNotification): void {
        let history = this._notificationHistory.get(componentId)
        if (!history) {
            history = []
            this._notificationHistory.set(componentId, history)
        }

        history.push(notification)

        // Trim history if it exceeds max size
        const config = this._componentConfigs.get(componentId)
        const maxSize = config?.maxHistorySize ?? 100
        
        if (history.length > maxSize) {
            history.splice(0, history.length - maxSize)
        }
    },

    /**
     * Internal method to process component batch
     * @private
     */
    _processComponentBatch: function(componentId: string, notifications: ComponentNotification[]): void {
        for (const notification of notifications) {
            this._addNotificationToHistory(componentId, notification)
        }

        // Debug batch in debug mode
        if (this._globalDebugMode) {
            console.log(`📦 [${componentId}] Processed batch of ${notifications.length} notifications`)
        }
    },

    /**
     * Internal method to process batch queue
     * @private
     */
    _processBatchQueue: function(componentId: string): void {
        const batchQueue = this._batchQueues.get(componentId)
        if (!batchQueue || batchQueue.notifications.length === 0) {
            return
        }

        this._processComponentBatch(componentId, batchQueue.notifications)

        // Clear the batch queue
        if (batchQueue.timeout) {
            clearTimeout(batchQueue.timeout)
        }
        this._batchQueues.delete(componentId)
    },

    /**
     * Cleans up component notifications and configuration
     * @param componentId - The component to clean up
     */
    cleanupComponent: function(componentId: string): void {
        this._componentConfigs.delete(componentId)
        this._notificationHistory.delete(componentId)
        
        // Process any remaining batch queue
        this._processBatchQueue(componentId)
    }
}
