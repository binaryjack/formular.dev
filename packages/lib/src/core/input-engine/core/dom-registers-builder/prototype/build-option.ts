import { IOptionItem } from '@core/framework/schema/option-schema/options.scheme.types'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Builds the option element configuration.
 * @param this DomRegisterBuilder instance
 * @param option The option item
 * @returns The option element configuration object
 */
export const buildOption = function (this: IDomRegisterBuilder, option: IOptionItem): any {
    const eleEvts = this.assembleEventsHandlers()
    return {
        id: `option-${option.id}`,
        type: this.context.input.type,
        title: option.text ?? '',
        ...eleEvts
    }
}
