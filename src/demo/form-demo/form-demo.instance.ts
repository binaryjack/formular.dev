import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'
import { applifeCylceInstance } from 'src/environment/start/app-lifecycle-instances'
import { controlsDemoSchema } from './form-demo.schema'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
const fm = serviceManager.resolve<IFormularManager<any>>(SFormularManager)

export const demoFormInstance = fm.createFromSchema(controlsDemoSchema)
