import { applifeCylceInstance, IFormularManager, SFormularManager } from 'formular.dev.lib'
import { controlsDemoSchema } from './form-demo.schema'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
const fm = serviceManager.lazy<IFormularManager>(SFormularManager)?.()

export const demoFormInstance = fm.createFromSchema(controlsDemoSchema)
