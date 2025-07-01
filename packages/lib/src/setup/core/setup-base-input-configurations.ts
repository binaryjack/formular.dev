import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { consoleTrackingProvider } from '@core/managers/tracking-manager/tracker-manager.default.provider'
import { validatorMaxLengthStrategy } from '@core/managers/validation-manager/strategies/validator-max-length-strategy'
import { validatorMaxStrategy } from '@core/managers/validation-manager/strategies/validator-max-strategy'
import { validatorMinLengthStrategy } from '@core/managers/validation-manager/strategies/validator-min-length-strategy'
import { validatorMinStrategy } from '@core/managers/validation-manager/strategies/validator-min-strategy'
import { validatorRequiredStrategy } from '@core/managers/validation-manager/strategies/validator-required-strategy'
import { validatorPatternStrategy } from '@core/managers/validation-manager/strategies/vaslidator-pattern-strategy'
import { booleanParserStrategy } from '@core/managers/value-manager/strategies/boolean-parser-strategy'
import { dateParserStrategy } from '@core/managers/value-manager/strategies/date-parser-strategy'
import { numericOptionParserStrategy } from '@core/managers/value-manager/strategies/numeric-option-parser-strategy'
import { numericParserStrategy } from '@core/managers/value-manager/strategies/numeric-parser-strategy'
import { selectOptionParserStrategy } from '@core/managers/value-manager/strategies/select-option-parser-strategy'
import { stringParserStrategy } from '@core/managers/value-manager/strategies/string-parser-strategy'

import {
    ITrackingStrategyService,
    STrackingStrategyService
} from '../services/tracking-strategy-service'
import {
    IValidationStrategyService,
    SValidationStrategyService
} from '../services/validation-strategy-service'
import {
    IValidationTriggerService,
    SValidationTriggerService
} from '../services/validation-trigger-service'
import { IValueStrategyService, SValueStrategyService } from '../services/value-strategy-service'

export const setupBaseFieldsConfiguration = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    const validationTriggerService =
        sm.lazy<IValidationTriggerService>(SValidationTriggerService)?.()
    const validationService = sm.lazy<IValidationStrategyService>(SValidationStrategyService)?.()
    const valueStrategyService = sm.lazy<IValueStrategyService>(SValueStrategyService)?.()
    const trackingStrategyService = sm.lazy<ITrackingStrategyService>(STrackingStrategyService)?.()

    validationService.add(
        validatorMaxLengthStrategy,
        validatorMaxStrategy,
        validatorMinLengthStrategy,
        validatorMinStrategy,
        validatorRequiredStrategy,
        validatorPatternStrategy
    )

    valueStrategyService.add(
        booleanParserStrategy,
        stringParserStrategy,
        numericParserStrategy,
        dateParserStrategy,
        numericOptionParserStrategy,
        selectOptionParserStrategy
    )

    trackingStrategyService.add(consoleTrackingProvider)

    validationTriggerService.add('onBlur', 'onChange', 'onKeyUp', 'onKeyDown', 'onFocus')
}
