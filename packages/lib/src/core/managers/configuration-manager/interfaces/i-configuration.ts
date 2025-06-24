import { IValidationMethodStrategy } from '@core/types'
import { ICommand } from './i-command'
import { ICulture } from './i-culture'
import { IEventTrigger } from './i-event-trigger'
import { IFormBehavior } from './i-form-behavior'
import { IRendering } from './i-rendering'
import { IReplacementToken } from './i-replacement-token'
import { ISuffix } from './i-suffix'
import { IValidationPattern } from './i-validation-pattern'

/**
 *
 */
export interface IConfiguration {
    name: string
    targetEnvironment: string
    cultures: {
        defaultCulture: ICulture
        supportedCultures: ICulture[]
        lokalizeTokensReplacement: IReplacementToken[]
    }
    rendering: {
        components: IRendering[]
        commands: ICommand<any>[]
        suffixes: ISuffix[]
    }
    behavior: {
        form: IFormBehavior
        validations: {
            triggers: IEventTrigger[]
            patterns: IValidationPattern[]
        }
        customValidations: IValidationMethodStrategy[]
        events: IEventTrigger[]
    }
}
