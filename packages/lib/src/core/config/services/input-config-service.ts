/**
 * FORMULAR - Input Configuration Service
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Specialized service for input configuration
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigurationService,
    IInputConfigService
} from '../interfaces/configuration-service.interfaces'
import { ErrorDisplayMode, ValidationTrigger } from '../types/library-config.types'

export const SInputConfigService = Symbol.for('IInputConfigService')

export const InputConfigService = function (this: IInputConfigService, sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    this.sm = sm

    const getConfigService = function (): IConfigurationService {
        return sm.resolve<IConfigurationService>(Symbol.for('IConfigurationService'))
    }

    this.getDefaultTrigger = function (): ValidationTrigger {
        return getConfigService().getInputConfig().defaultValidationTrigger
    }

    this.getErrorDisplay = function (): ErrorDisplayMode {
        return getConfigService().getInputConfig().defaultErrorDisplay
    }

    this.getDebounceMs = function (): number {
        return getConfigService().getInputConfig().debounceMs
    }

    this.isAutoFocusEnabled = function (): boolean {
        return getConfigService().getInputConfig().autoFocus
    }

    this.isAccessibilityEnabled = function (): boolean {
        return getConfigService().getInputConfig().enableAccessibility
    }
} as any as IInputConfigService
