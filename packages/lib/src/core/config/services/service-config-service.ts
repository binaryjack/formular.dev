/**
 * FORMULAR - Service Configuration Service
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Specialized service for service management configuration
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigurationService,
    IServiceConfigService
} from '../interfaces/configuration-service.interfaces'

export const SServiceConfigService = Symbol.for('IServiceConfigService')

export const ServiceConfigService = function (this: IServiceConfigService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    this.sm = sm

    const getConfigService = function (): IConfigurationService {
        return sm.resolve<IConfigurationService>(Symbol.for('IConfigurationService'))
    }

    this.isDevelopmentValidationEnabled = function (): boolean {
        return getConfigService().getServiceConfig().enableDevelopmentValidation
    }

    this.isCircularDependencyDetectionEnabled = function (): boolean {
        return getConfigService().getServiceConfig().enableCircularDependencyDetection
    }

    this.getLogLevel = function (): string {
        return getConfigService().getServiceConfig().logLevel
    }

    this.isPerformanceMetricsEnabled = function (): boolean {
        return getConfigService().getServiceConfig().enablePerformanceMetrics
    }
} as any as IServiceConfigService
