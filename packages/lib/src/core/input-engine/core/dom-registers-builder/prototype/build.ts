import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Builds the main input element configuration.
 * @param this DomRegisterBuilder instance
 * @returns The element configuration object
 */
export const build = function (this: IDomRegisterBuilder): any {
    let hasMask = false
    if (this.context.dependencyName === 'MaskedBaseInput') {
        hasMask = !!(this.context as unknown as IMaskedBaseInput)?.mask
    }
    const eleEvts = this.assembleEventsHandlers()
    return {
        id: `${this.context.input.id}`,
        /** I need hack date input */
        type: hasMask ? 'text' : this.context.input.type,
        className: 'base-input',
        title: this.context.input.label ?? '',
        ...eleEvts
    }
}
