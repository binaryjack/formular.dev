import { Formular } from '@core/formular-engine/formular-base/formular-base'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'

import { IFormularManager } from '../formular-manager.types'

export const createfromConfiguration = function <T extends object>(
    this: IFormularManager<T>,
    id: string,
    configs: IDependencyConfiguration[]
): IFormular<T> | undefined {
    if (this.forms.has(id)) {
        const existingForm = this.forms.get(id)
        return existingForm as IFormular<T>
    }
    const frm = new Formular(id, this)
    const fields = this.fieldProvider.createManyFromConfiguration(configs)
    frm.addFields(...fields)
    this.forms.set(id, frm)
    return frm
}
