import { DrawerOpenStateType } from '../../../../components/drawer/Drawer.types'
import { IFieldInput } from '../fieldInput.types'

export const setOpenState = function (this: IFieldInput, state: DrawerOpenStateType) {
    this.openState = state
    //this.observers.trigger()
    this.notify('changed', {
        fieldName: this.name,
        fieldState: 'reset'
    })
}
