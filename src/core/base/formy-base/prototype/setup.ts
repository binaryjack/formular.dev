import { INotifiableEntity } from '../../../notifiable-entity/notifiable-entity-base.types'
import { IFormy } from '../formy-base.types'

export const setup = function (this: IFormy, autoTracker?: INotifiableEntity) {
    this.autoTracker = autoTracker
}
