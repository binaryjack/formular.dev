/**
 * FORMULAR - Validation Configuration Service
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Specialized service for validation configuration
 */

import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IConfigurationService,
    IValidationConfigService
} from '../interfaces/configuration-service.interfaces'
import { FallbackBehavior, ValidationConfig } from '../types/library-config.types'

export const SValidationConfigService = Symbol.for('IValidationConfigService')

export const ValidationConfigService = function (
    this: IValidationConfigService,
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

    this.getPatterns = function (): ValidationConfig['patterns'] {
        return getConfigService().getValidationConfig().patterns
    }

    this.getFallbackBehavior = function (): FallbackBehavior {
        return getConfigService().getValidationConfig().fallbackBehavior
    }

    this.isStrictModeEnabled = function (): boolean {
        return getConfigService().getValidationConfig().enableStrictMode
    }

    this.validatePattern = function (type: string, locale: string, value: string): boolean {
        const patterns = this.getPatterns()
        const patternMap = patterns[type]

        if (!patternMap) {
            throw new Error(`Unknown validation pattern type: ${type}`)
        }

        const pattern = patternMap[locale] ?? patternMap.fallback

        if (!pattern) {
            const fallbackBehavior = this.getFallbackBehavior()
            switch (fallbackBehavior) {
                case 'strict':
                    throw new Error(
                        `No pattern found for ${type}:${locale} and no fallback available`
                    )
                case 'lenient':
                    return true // Allow anything if no pattern found
                case 'silent':
                    return false // Fail silently if no pattern found
                default:
                    return true
            }
        }

        return pattern.test(value)
    }

    this.getPatternForLocale = function (type: string, locale: string): RegExp | undefined {
        const patterns = this.getPatterns()
        const patternMap = patterns[type]

        if (!patternMap) {
            return undefined
        }

        return patternMap[locale] ?? patternMap.fallback
    }

    this.getSupportedLocales = function (type: string): string[] {
        const patterns = this.getPatterns()
        const patternMap = patterns[type]

        if (!patternMap) {
            return []
        }

        return Object.keys(patternMap).filter((key) => key !== 'fallback')
    }
} as any as IValidationConfigService
