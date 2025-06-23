/**
 * FORMULAR - Input Configuration Presets
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Centralized input configuration presets accessible through InputConfigService
 * This provides preconfigured input settings for common use cases
 */

import { IInputConfigService } from '@core/config/interfaces/configuration-service.interfaces'
import { SInputConfigService } from '@core/config/services/input-config-service'
import { ErrorDisplayMode, ValidationTrigger } from '@core/config/types/library-config.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

/**
 * Input configuration presets interface
 * Provides easy access to preconfigured input settings
 */
export interface IInputConfigPresets {
    /**
     * Validation trigger presets
     */
    triggers: {
        realTime: ValidationTrigger
        onFieldExit: ValidationTrigger
        onFormSubmit: ValidationTrigger
        default: () => ValidationTrigger
    }

    /**
     * Error display presets
     */
    errorDisplay: {
        inline: ErrorDisplayMode
        tooltip: ErrorDisplayMode
        summary: ErrorDisplayMode
        default: () => ErrorDisplayMode
    }

    /**
     * Debounce timing presets
     */
    debounce: {
        immediate: number
        fast: number
        normal: number
        slow: number
        default: () => number
    }

    /**
     * Accessibility presets
     */
    accessibility: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Auto-focus presets
     */
    autoFocus: {
        enabled: boolean
        disabled: boolean
        default: () => boolean
    }

    /**
     * Common input configurations
     */
    profiles: {
        /**
         * Fast, real-time validation for critical fields
         */
        realTimeProfile: () => {
            trigger: ValidationTrigger
            errorDisplay: ErrorDisplayMode
            debounce: number
            autoFocus: boolean
            accessibility: boolean
        }

        /**
         * Balanced profile for most form fields
         */
        standardProfile: () => {
            trigger: ValidationTrigger
            errorDisplay: ErrorDisplayMode
            debounce: number
            autoFocus: boolean
            accessibility: boolean
        }

        /**
         * Less intrusive validation for optional fields
         */
        relaxedProfile: () => {
            trigger: ValidationTrigger
            errorDisplay: ErrorDisplayMode
            debounce: number
            autoFocus: boolean
            accessibility: boolean
        }

        /**
         * High accessibility profile for inclusive design
         */
        accessibilityProfile: () => {
            trigger: ValidationTrigger
            errorDisplay: ErrorDisplayMode
            debounce: number
            autoFocus: boolean
            accessibility: boolean
        }
    }

    /**
     * Custom configurations
     */
    custom: {
        createProfile: (options: {
            trigger?: ValidationTrigger
            errorDisplay?: ErrorDisplayMode
            debounce?: number
            autoFocus?: boolean
            accessibility?: boolean
        }) => {
            trigger: ValidationTrigger
            errorDisplay: ErrorDisplayMode
            debounce: number
            autoFocus: boolean
            accessibility: boolean
        }
    }
}

export const SInputConfigPresets = Symbol.for('IInputConfigPresets')

/**
 * InputConfigPresets implementation
 * Provides easy access to input configuration through InputConfigService
 */
export const InputConfigPresets = function (
    this: IInputConfigPresets,
    sm: IServiceManager
): IInputConfigPresets {
    if (!sm) {
        throw new Error('ServiceManager is required for InputConfigPresets')
    }

    const getInputConfig = (): IInputConfigService => {
        try {
            return sm.resolve<IInputConfigService>(SInputConfigService)
        } catch (error: any) {
            console.warn(
                'InputConfigService not available, using fallback configuration:',
                error.message
            )
            throw new Error(
                'InputConfigService not found. Ensure setupConfigurationServices() is called first.'
            )
        }
    }

    // Static presets
    this.triggers = {
        realTime: 'onChange',
        onFieldExit: 'onBlur',
        onFormSubmit: 'onSubmit',
        default: () => getInputConfig().getDefaultTrigger()
    }

    this.errorDisplay = {
        inline: 'inline',
        tooltip: 'tooltip',
        summary: 'summary',
        default: () => getInputConfig().getErrorDisplay()
    }

    this.debounce = {
        immediate: 0,
        fast: 150,
        normal: 300,
        slow: 600,
        default: () => getInputConfig().getDebounceMs()
    }

    this.accessibility = {
        enabled: true,
        disabled: false,
        default: () => getInputConfig().isAccessibilityEnabled()
    }

    this.autoFocus = {
        enabled: true,
        disabled: false,
        default: () => getInputConfig().isAutoFocusEnabled()
    }

    // Configuration profiles
    this.profiles = {
        realTimeProfile: () => ({
            trigger: this.triggers.realTime,
            errorDisplay: this.errorDisplay.inline,
            debounce: this.debounce.fast,
            autoFocus: this.autoFocus.enabled,
            accessibility: this.accessibility.enabled
        }),

        standardProfile: () => ({
            trigger: this.triggers.onFieldExit,
            errorDisplay: this.errorDisplay.inline,
            debounce: this.debounce.normal,
            autoFocus: this.autoFocus.disabled,
            accessibility: this.accessibility.enabled
        }),

        relaxedProfile: () => ({
            trigger: this.triggers.onFormSubmit,
            errorDisplay: this.errorDisplay.summary,
            debounce: this.debounce.slow,
            autoFocus: this.autoFocus.disabled,
            accessibility: this.accessibility.enabled
        }),

        accessibilityProfile: () => ({
            trigger: this.triggers.onFieldExit,
            errorDisplay: this.errorDisplay.inline,
            debounce: this.debounce.normal,
            autoFocus: this.autoFocus.enabled,
            accessibility: this.accessibility.enabled
        })
    }

    this.custom = {
        createProfile: (options) => {
            const config = getInputConfig()
            return {
                trigger: options.trigger ?? config.getDefaultTrigger(),
                errorDisplay: options.errorDisplay ?? config.getErrorDisplay(),
                debounce: options.debounce ?? config.getDebounceMs(),
                autoFocus: options.autoFocus ?? config.isAutoFocusEnabled(),
                accessibility: options.accessibility ?? config.isAccessibilityEnabled()
            }
        }
    }

    return this
} as any as IInputConfigPresets

/**
 * Registers InputConfigPresets with the IoC container
 */
export const registerInputConfigPresets = function (sm: IServiceManager): void {
    if (!sm.isRegistered(SInputConfigPresets)) {
        sm.register(
            SInputConfigPresets,
            (container: IServiceManager) => {
                return new (InputConfigPresets as any)(container)
            },
            {
                lifetime: 'singleton'
            }
        )
    }
}

/**
 * Factory function for creating InputConfigPresets
 * This follows the same pattern as ValidationConfigPresets
 */
export const getInputConfigPresets = function (sm: IServiceManager): IInputConfigPresets {
    if (!sm.isRegistered(SInputConfigPresets)) {
        registerInputConfigPresets(sm)
    }
    return sm.resolve<IInputConfigPresets>(SInputConfigPresets)
}
