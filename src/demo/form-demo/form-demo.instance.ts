import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'

import { applifeCylceInstance } from '@project/start/app-lifecycle-instances'
import { controlsDemoSchema } from './form-demo.schema'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
const fm = serviceManager.lazy<IFormularManager>(SFormularManager)?.()

export const demoFormInstance = fm.createFromSchema(controlsDemoSchema)
