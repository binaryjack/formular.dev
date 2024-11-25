import { FieldInputStateType } from '../common.types'
import { IFieldStateStyle } from './fieldStateStyle.types'

export const FieldStateStyle = function (this: IFieldStateStyle) {
    this.classesList = new Map<FieldInputStateType, string>([
        ['dirty', 'is-not-dirty'],
        ['errors', 'no-errors'],
        ['focus', 'is-not-focus'],
        ['open', 'is-closed'],
        ['pristine', 'is-pristine'],
        ['valid', 'is-valid']
    ])
    this.update = function (type: FieldInputStateType, state: boolean) {
        switch (type) {
            case 'errors':
                this.classesList.set(type, state ? `has-${type}` : `no-${type}`)
                break
            case 'open':
                this.classesList.set(type, state ? `is-${type}` : `is-closed`)
                break
            case 'valid':
            case 'dirty':
            case 'pristine':
            case 'focus':
                this.classesList.set(type, state ? `is-${type}` : `is-not-${type}`)
                break
        }
    }
    this.get = function () {
        return Array.from(this.classesList.values()).join(' ')
    }
} as any as IFieldStateStyle
