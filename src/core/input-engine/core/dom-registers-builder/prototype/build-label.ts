import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IDomRegisterBuilder } from '../dom-registers-builder.type'

/**
 * Builds the label element configuration.
 * @param this DomRegisterBuilder instance
 * @param option The option item
 * @returns The label element configuration object
 */
export const buildLabel = function (this: IDomRegisterBuilder, option: IOptionItem): any {
    const eleEvts = this.assembleEventsHandlers()
    return {
        id: `label-${option.id}`,
        type: 'label',
        title: option.text ?? '',
        ...eleEvts
    }
}
