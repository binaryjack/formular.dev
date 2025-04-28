import { INotifiableEntity } from '../notifiable-entity-base.types'

export const getRegisteredNotifierNames = function (this: INotifiableEntity) {
    return [...this.notifiers.keys()]
}
