import type { IDrawerAnimationController } from './drawer-animation-controller.types'

// Import all prototype methods
import { animateToProgressAsync } from './prototype/animate-to-progress-async'
import { close } from './prototype/close'
import { open } from './prototype/open'
import { setProgress } from './prototype/set-progress'
import { setupCSSFallback } from './prototype/setup-css-fallback'
import { setupWAAPI } from './prototype/setup-waapi'

/**
 * Hybrid drawer animation controller that supports both Web Animations API
 * and CSS custom properties fallback for maximum browser compatibility.
 *
 * Provides precise control over drawer animations with smooth transitions
 * between any percentage states (0%, 50%, 100%, etc.).
 */
export const DrawerAnimationController = function (
    this: IDrawerAnimationController,
    element: HTMLElement
): void {
    // Initialize instance properties
    this.element = element
    this.currentProgress = 0
    this.supportsWAAPI = 'animate' in element
    this.animation = undefined

    // Setup animation method based on browser capabilities
    if (this.supportsWAAPI) {
        this.setupWAAPI()
    } else {
        this.setupCSSFallback()
    }
} as any as new (element: HTMLElement) => IDrawerAnimationController

// Assign all prototype methods
Object.assign(DrawerAnimationController.prototype, {
    setupWAAPI,
    setupCSSFallback,
    setProgress,
    animateToProgressAsync,
    open,
    close
})
