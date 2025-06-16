/**
 * FORMULAR - Notification Configuration Service
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Specialized service for notification configuration
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigurationService,
    INotificationConfigService
} from '../interfaces/configuration-service.interfaces'

export const SNotificationConfigService = Symbol.for('INotificationConfigService')

export const NotificationConfigService = function (
    this: INotificationConfigService,
    sm: IServiceManager
) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    this.sm = sm

    const getConfigService = function (): IConfigurationService {
        return sm.resolve<IConfigurationService>(Symbol.for('IConfigurationService'))
    }

    this.getDefaultDuration = function (): number {
        return getConfigService().getNotificationConfig().defaultDuration
    }

    this.getMaxConcurrent = function (): number {
        return getConfigService().getNotificationConfig().maxConcurrent
    }

    this.getPosition = function (): string {
        return getConfigService().getNotificationConfig().position
    }

    this.isSoundEnabled = function (): boolean {
        return getConfigService().getNotificationConfig().enableSound
    }

    this.isAnimationEnabled = function (): boolean {
        return getConfigService().getNotificationConfig().enableAnimation
    }
} as any as INotificationConfigService
