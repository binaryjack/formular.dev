/**
 * FORMULAR - Notification Configuration Presets
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized notification configuration presets accessible through NotificationConfigService
 * This provides preconfigured notification settings for common use cases
 */

import { INotificationConfigService } from '@core/config/interfaces/configuration-service.interfaces'
import { SNotificationConfigService } from '@core/config/services/notification-config-service'
import { NotificationPosition } from '@core/config/types/library-config.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

/**
 * Notification configuration presets interface
 * Provides easy access to preconfigured notification settings
 */
export interface INotificationConfigPresets {
    /**
     * Duration presets (in milliseconds)
     */
    duration: {
        flash: number
        brief: number
        normal: number
        long: number
        persistent: number
        default: () => number
    }

    /**
     * Positioning presets
     */
    position: {
        top: NotificationPosition
        bottom: NotificationPosition
        center: NotificationPosition
        default: () => string
    }

    /**
     * Concurrency presets
     */
    maxConcurrent: {
        single: number
        few: number
        normal: number
        many: number
        unlimited: number
        default: () => number
    }

    /**
     * Sound preferences
     */
    sound: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Animation preferences
     */
    animation: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Common notification profiles
     */
    profiles: {
        /**
         * Quick flash notifications for success states
         */
        successProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }

        /**
         * Attention-grabbing notifications for errors
         */
        errorProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }

        /**
         * Informational notifications
         */
        infoProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }

        /**
         * Warning notifications
         */
        warningProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }

        /**
         * Silent, minimal notifications
         */
        silentProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }

        /**
         * Accessibility-enhanced notifications
         */
        accessibilityProfile: () => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }
    }

    /**
     * Custom configurations
     */
    custom: {
        createProfile: (options: {
            duration?: number
            position?: string
            maxConcurrent?: number
            sound?: boolean
            animation?: boolean
        }) => {
            duration: number
            position: string
            maxConcurrent: number
            sound: boolean
            animation: boolean
        }
    }
}

export const SNotificationConfigPresets = Symbol.for('INotificationConfigPresets')

/**
 * NotificationConfigPresets implementation
 * Provides easy access to notification configuration through NotificationConfigService
 */
export const NotificationConfigPresets = function (
    this: INotificationConfigPresets,
    sm: IServiceManager
): INotificationConfigPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for NotificationConfigPresets')
    }

    const getNotificationConfig = (): INotificationConfigService => {
        try {
            return sm.resolve<INotificationConfigService>(SNotificationConfigService)
        } catch (error: any) {
            console.warn(
                'NotificationConfigService not available, using fallback configuration:',
                error.message
            )
            throw new Error(
                'NotificationConfigService not found. Ensure setupConfigurationServices() is called first.'
            )
        }
    }

    // Static presets
    this.duration = {
        flash: 1500,
        brief: 2500,
        normal: 4000,
        long: 7000,
        persistent: 0, // 0 means manual dismiss
        default: () => getNotificationConfig().getDefaultDuration()
    }

    this.position = {
        top: 'top',
        bottom: 'bottom',
        center: 'center',
        default: () => getNotificationConfig().getPosition()
    }

    this.maxConcurrent = {
        single: 1,
        few: 3,
        normal: 5,
        many: 10,
        unlimited: -1,
        default: () => getNotificationConfig().getMaxConcurrent()
    }

    this.sound = {
        enabled: true,
        disabled: false,
        default: () => getNotificationConfig().isSoundEnabled()
    }

    this.animation = {
        enabled: true,
        disabled: false,
        default: () => getNotificationConfig().isAnimationEnabled()
    }

    // Configuration profiles
    this.profiles = {
        successProfile: () => ({
            duration: this.duration.brief,
            position: this.position.top,
            maxConcurrent: this.maxConcurrent.few,
            sound: this.sound.disabled,
            animation: this.animation.enabled
        }),

        errorProfile: () => ({
            duration: this.duration.long,
            position: this.position.center,
            maxConcurrent: this.maxConcurrent.few,
            sound: this.sound.enabled,
            animation: this.animation.enabled
        }),

        infoProfile: () => ({
            duration: this.duration.normal,
            position: this.position.top,
            maxConcurrent: this.maxConcurrent.normal,
            sound: this.sound.disabled,
            animation: this.animation.enabled
        }),

        warningProfile: () => ({
            duration: this.duration.normal,
            position: this.position.center,
            maxConcurrent: this.maxConcurrent.few,
            sound: this.sound.enabled,
            animation: this.animation.enabled
        }),

        silentProfile: () => ({
            duration: this.duration.brief,
            position: this.position.bottom,
            maxConcurrent: this.maxConcurrent.single,
            sound: this.sound.disabled,
            animation: this.animation.disabled
        }),

        accessibilityProfile: () => ({
            duration: this.duration.persistent, // Manual dismiss for accessibility
            position: this.position.center,
            maxConcurrent: this.maxConcurrent.single,
            sound: this.sound.enabled,
            animation: this.animation.disabled // No animations for accessibility
        })
    }

    this.custom = {
        createProfile: (options) => {
            const config = getNotificationConfig()
            return {
                duration: options.duration ?? config.getDefaultDuration(),
                position: options.position ?? config.getPosition(),
                maxConcurrent: options.maxConcurrent ?? config.getMaxConcurrent(),
                sound: options.sound ?? config.isSoundEnabled(),
                animation: options.animation ?? config.isAnimationEnabled()
            }
        }
    }

    return this
} as any as INotificationConfigPresets

/**
 * Registers NotificationConfigPresets with the IoC container
 */
export const registerNotificationConfigPresets = function (sm: IServiceManager): void {
    if (!sm.isRegistered(SNotificationConfigPresets)) {
        sm.register(
            SNotificationConfigPresets,
            (container: IServiceManager) => {
                return new (NotificationConfigPresets as any)(container)
            },
            {
                lifetime: 'singleton'
            }
        )
    }
}

/**
 * Factory function for creating NotificationConfigPresets
 * This follows the same pattern as ValidationConfigPresets
 */
export const getNotificationConfigPresets = function (
    sm: IServiceManager
): INotificationConfigPresets {
    if (!sm.isRegistered(SNotificationConfigPresets)) {
        registerNotificationConfigPresets(sm)
    }
    return sm.resolve<INotificationConfigPresets>(SNotificationConfigPresets)
}
