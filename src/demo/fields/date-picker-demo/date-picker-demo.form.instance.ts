import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'

import { applifeCylceInstance } from '@project/start/app-lifecycle-instances'
import { datePickerDemoSchema } from './date-picker-demo.schema'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
const fm = serviceManager.resolve<IFormularManager>(SFormularManager)
export const datePickerDemoFormInstance = fm.createFromSchema(datePickerDemoSchema)
