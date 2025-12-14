import type { IFormularElementInstance } from '../interfaces/i-formular-element-instance'

/**
 * _setupStyleExtensions method for FormularElement
 * Setup style manager extensions for web components
 */
export const _setupStyleExtensions = function(this: IFormularElementInstance): void {
    if (!this._styleManager?.extend) return

    const webStyleExtension = {
        setCSSVariable: function(this: any, name: string, value: string) {
            this.cssVariables = this.cssVariables ?? new Map()
            this.cssVariables.set(name, value)
        },
        applyCSSVariables: function(this: any, variables: Record<string, string>) {
            this.cssVariables = this.cssVariables ?? new Map()
            Object.entries(variables).forEach(([name, value]) => {
                this.cssVariables.set(name, value)
            })
        }
    }

    this._styleManager.extend('webComponents', webStyleExtension)
}
