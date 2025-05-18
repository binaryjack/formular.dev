import { Formular } from '@core/formular-base/formular-base'
import { IFormular } from '@core/formular-base/formular-base.types'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { InputsProviderFromConfigurations } from '@core/input-engine/generator/input-provider'
import { IFormularManager } from '../formular-manager.types'

export const createfromDescriptor = function (
    this: IFormularManager,
    id: string,
    configs: IDependencyConfiguration[]
): IFormular | undefined {
    if (this.forms.has(id)) {
        throw new Error(`Form with id ${id} already exists`)
    }
    const frm = new Formular(id, this)
    const fields = InputsProviderFromConfigurations(configs)
    frm.addFields(...fields)
    this.forms.set(id, frm)
    return this.forms.get(id) as IFormular
}
