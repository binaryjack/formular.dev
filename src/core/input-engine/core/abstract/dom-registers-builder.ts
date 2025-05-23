import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { onClick } from '../../variants/click-base/events/on-click'
import { AriaHelper } from '../accessibility/arias'
import { onBlur } from '../input-base/events/on-blur'
import { onChange } from '../input-base/events/on-changed'
import { onFocus } from '../input-base/events/on-focus'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { onClickOption } from '@core/input-engine/variants/click-base/events/on-click-option'
import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { IExtendedInput } from '../input-base/input-base.types'

export interface IDomRegisterBuilder {
    new (context: IExtendedInput): IDomRegisterBuilder
    onChange: (e: Event) => void
    onBlur: (e: Event) => void
    onFocus: (e: Event) => void
    onClick: (e: Event) => void
    onClickOption: (e: Event) => void

    registerChange: (customOnChange?: (e: Event) => void) => IDomRegisterBuilder
    registerBlur: () => IDomRegisterBuilder
    registerFocus: () => IDomRegisterBuilder
    registerClick: () => IDomRegisterBuilder
    registerClickOption: (optionId: string) => IDomRegisterBuilder
    registerAria: (...arias: IAria[]) => IDomRegisterBuilder
    build: () => any
    buildOption: (option: IOptionItem) => any
    buildLabel: (option: IOptionItem) => any
}

export const DomRegisterBuilder = function (this: IDomRegisterBuilder, context: IExtendedInput) {
    this.registerChange = function (
        this: IDomRegisterBuilder,
        customOnChange?: (e: Event) => void
    ) {
        this.onChange = customOnChange
            ? (e: Event) => customOnChange(e)
            : (e: Event) => onChange(context, e)
        return this
    }
    this.registerBlur = function (this: IDomRegisterBuilder) {
        this.onBlur = (e: Event) => onBlur(context, e)
        return this
    }
    this.registerFocus = function (this: IDomRegisterBuilder) {
        this.onFocus = (e: Event) => onFocus(context, e)
        return this
    }
    this.registerClick = function (this: IDomRegisterBuilder) {
        this.onClick = (e: Event) => onClick(context, e)
        return this
    }
    this.registerClickOption = function (this: IDomRegisterBuilder, optionId: string) {
        this.onClickOption = (e: Event) => onClickOption(context, optionId, e)
        return this
    }
    this.registerAria = function (this: IDomRegisterBuilder, ...arias: IAria[]) {
        const ah = new AriaHelper()
        ah.addMany(...(arias ?? []))
        ah.apply(context.input)
        return this
    }
    this.build = function (this: IDomRegisterBuilder): any {
        let hasMask = false
        if (context.dependencyName === 'MaskedBaseInput') {
            hasMask = !!(context as unknown as IMaskedBaseInput)?.mask
        }

        return {
            id: `${context.input.id}`,
            /** I need hack date input */
            type: hasMask ? 'text' : context.input.type,
            className: 'base-input',
            title: context.input.label ?? '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onClick: this.onClick
        }
    }
    this.buildOption = function (this: IDomRegisterBuilder, option: IOptionItem): any {
        return {
            id: `option-${option.id}`,
            type: context.input.type,
            title: option.text ?? '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onClick: this.onClickOption
        }
    }
    this.buildLabel = function (this: IDomRegisterBuilder, option: IOptionItem): any {
        return {
            id: `label-${option.id}`,
            type: 'label',
            title: option.text ?? '',
            onClick: this.onClickOption
        }
    }
} as any as IDomRegisterBuilder
