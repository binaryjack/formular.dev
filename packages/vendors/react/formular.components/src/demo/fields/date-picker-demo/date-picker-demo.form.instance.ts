import { applifeCylceInstance, IFormularManager, SFormularManager } from 'formular.dev.lib'
import { datePickerDemoSchema } from './date-picker-demo.schema'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
const fm = serviceManager.lazy<IFormularManager>(SFormularManager)?.()
export const datePickerDemoFormInstance = fm.createFromSchema(datePickerDemoSchema)
