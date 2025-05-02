import { AriaHelper } from '../accessibility/arias'
import { onBlur } from '../events/on-blur'
import { onChange } from '../events/on-changed'
import { onClick } from '../events/on-click'
import { onClickLabel } from '../events/on-click-label'
import { onFocus } from '../events/on-focus'
import { IFieldInput, IFieldInputExtended } from '../field-input-base-types'

export interface IDomRegisterBuilder {
    new (context: IFieldInputExtended<IFieldInput>): IDomRegisterBuilder
    onchange: (e: Event) => void
    onblur: (e: Event) => void
    onfocus: (e: Event) => void
    onclick: (e: Event) => void

    registerChange: () => IDomRegisterBuilder
    registerBlur: () => IDomRegisterBuilder
    registerFocus: () => IDomRegisterBuilder
    registerClick: () => IDomRegisterBuilder
    registerClickLabel: (optionId: string) => IDomRegisterBuilder
    registerAria: () => IDomRegisterBuilder
    build: () => Partial<HTMLInputElement>
}

export const domRegister = function (
    this: IDomRegisterBuilder,
    context: IFieldInputExtended<IFieldInput>
) {
    this.registerChange = function (this: IDomRegisterBuilder) {
        this.onchange = (e: Event) => onChange(context.field(), e)
        return this
    }
    this.registerBlur = function (this: IDomRegisterBuilder) {
        this.onblur = (e: Event) => onBlur(context.field(), e)
        return this
    }
    this.registerFocus = function (this: IDomRegisterBuilder) {
        this.onfocus = (e: Event) => onFocus(context.field(), e)
        return this
    }
    this.registerClick = function (this: IDomRegisterBuilder) {
        this.onclick = (e: Event) => onClick(context.field(), e)
        return this
    }
    this.registerClickLabel = function (this: IDomRegisterBuilder, optionId: string) {
        this.onclick = (e: Event) => onClickLabel(context, optionId, e)
        return this
    }
    this.registerAria = function (this: IDomRegisterBuilder) {
        const ah = new AriaHelper()
        ah.applyNameAndLabel(context.field())
        return this
    }
    this.build = function (this: IDomRegisterBuilder): Partial<HTMLInputElement> {
        return {
            id: `${context.field().id}`,
            type: context.field().type,
            className: context.field().style()?.classNames() ?? '',
            title: context.field().label ?? '',
            ariaDescription: `${context.field().name}`,
            ariaLabel: context.field().label ?? '',
            ariaValueText: context.field()?.validationStrategy()?.toString(),
            onchange: this.onchange,
            onblur: this.onblur,
            onfocus: this.onfocus,
            onclick: this.onclick
        }
    }
} as any as IDomRegisterBuilder
