import { IAria } from '@core/managers/dom-manager/dom-manager.types'
import { AriaHelper } from '../accessibility/arias'
import { onBlur } from '../input-base/events/on-blur'
import { onChange } from '../input-base/events/on-changed'
import { onClick } from '../input-base/events/on-click'
import { onClickLabel } from '../input-base/events/on-click-label'
import { onFocus } from '../input-base/events/on-focus'

import { IExtendedInput } from '../input-base/input-base.types'

export interface IDomRegisterBuilder {
    new (context: IExtendedInput): IDomRegisterBuilder
    onChange: (e: Event) => void
    onBlur: (e: Event) => void
    onFocus: (e: Event) => void
    onClick: (e: Event) => void
    onClickLabel: (e: Event) => void

    registerChange: () => IDomRegisterBuilder
    registerBlur: () => IDomRegisterBuilder
    registerFocus: () => IDomRegisterBuilder
    registerClick: () => IDomRegisterBuilder
    registerClickLabel: (optionId: string) => IDomRegisterBuilder
    registerAria: (...arias: IAria[]) => IDomRegisterBuilder
    build: () => any
}

export const DomRegisterBuilder = function (this: IDomRegisterBuilder, context: IExtendedInput) {
    this.registerChange = function (this: IDomRegisterBuilder) {
        this.onChange = (e: Event) => onChange(context, e)
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
    this.registerClickLabel = function (this: IDomRegisterBuilder, optionId: string) {
        this.onClickLabel = (e: Event) => onClickLabel(context, optionId, e)
        return this
    }
    this.registerAria = function (this: IDomRegisterBuilder, ...arias: IAria[]) {
        const ah = new AriaHelper()
        ah.addMany(...(arias ?? []))
        ah.apply(context.input)
        return this
    }
    this.build = function (this: IDomRegisterBuilder): any {
        return {
            id: `${context.input.id}`,
            type: context.input.type,
            className: 'base-input',
            title: context.input.label ?? '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onClick: this.onClick
        }
    }
} as any as IDomRegisterBuilder
