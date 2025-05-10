import { AriaHelper } from '../accessibility/arias'
import { onBlur } from '../events/on-blur'
import { onChange } from '../events/on-changed'
import { onClick } from '../events/on-click'
import { onClickLabel } from '../events/on-click-label'
import { onFocus } from '../events/on-focus'
import { IExtendedFieldInput } from '../field-input-base-types'

export interface IDomRegisterBuilder {
    new (context: IExtendedFieldInput): IDomRegisterBuilder
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
    registerAria: () => IDomRegisterBuilder
    build: () => any
}

export const DomRegisterBuilder = function (
    this: IDomRegisterBuilder,
    context: IExtendedFieldInput
) {
    this.registerChange = function (this: IDomRegisterBuilder) {
        this.onChange = (e: Event) => onChange(context.field, e)
        return this
    }
    this.registerBlur = function (this: IDomRegisterBuilder) {
        this.onBlur = (e: Event) => onBlur(context.field, e)
        return this
    }
    this.registerFocus = function (this: IDomRegisterBuilder) {
        this.onFocus = (e: Event) => onFocus(context.field, e)
        return this
    }
    this.registerClick = function (this: IDomRegisterBuilder) {
        this.onClick = (e: Event) => onClick(context.field, e)
        return this
    }
    this.registerClickLabel = function (this: IDomRegisterBuilder, optionId: string) {
        this.onClickLabel = (e: Event) => onClickLabel(context, optionId, e)
        return this
    }
    this.registerAria = function (this: IDomRegisterBuilder) {
        const ah = new AriaHelper()
        ah.applyNameAndLabel(context.field)
        return this
    }
    this.build = function (this: IDomRegisterBuilder): any {
        return {
            id: `${context.field.id}`,
            type: context.field.type,
            className: context.field.styleManager?.classNames() ?? '',
            title: context.field.label ?? '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
            onClick: this.onClick
        }
    }
} as any as IDomRegisterBuilder
