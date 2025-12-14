import { DrawerType } from '../types/drawer.types'
import type { IDrawerAnimationController } from './drawer-animation-controller.types'

// Import all prototype methods
import { animateToProgressAsync } from './prototype/animate-to-progress-async'
import { close } from './prototype/close'
import { open } from './prototype/open'
import { setProgress } from './prototype/set-progress'
import { setupCSSFallback } from './prototype/setup-css-fallback'
import { setupWAAPI } from './prototype/setup-waapi'
import { updateContentHeight } from './prototype/update-content-height'

/**
 * Hybrid drawer animation controller that supports both Web Animations API
 * and CSS custom properties fallback for maximum browser compatibility.
 *
 * Provides precise control over drawer animations with smooth transitions
 * between any percentage states (0%, 50%, 100%, etc.).
 */
export const DrawerAnimationController = function (
    this: IDrawerAnimationController,
    element: HTMLElement,
    drawerType: DrawerType
): void {
    // Initialize instance properties
    this.drawerType = drawerType
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
} as any as IDrawerAnimationController

// Assign all prototype methods
Object.assign(DrawerAnimationController.prototype, {
    setupWAAPI,
    setupCSSFallback,
    setProgress,
    animateToProgressAsync,
    updateContentHeight,
    open,
    close
})
