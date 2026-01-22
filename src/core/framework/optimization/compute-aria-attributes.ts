import { aria } from '@core/input-engine/core/accessibility/arias'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { memoize } from './memoize'

export const computeAriaAttributes = memoize((ei: IExtendedInput) => {
    const lableId = `${ei?.input.id}${ei?.input.labelId}`
    const describedbyId = `${ei?.input.id}${ei?.input.describedById}`

    return [
        aria('labelledby', lableId),
        aria('describedby', describedbyId),
        aria('name', ei?.input.name),
        aria('label', ei?.input.name),
        aria('required', ei?.input.validationOptions?.required?.value ? 'true' : 'false'),
        aria('invalid', ei?.input.isValid ? 'false' : 'true'),
        aria('disabled', ei?.input.enabled ? 'false' : 'true'),
        aria('readonly', 'false'),
        aria('autocomplete', 'none'),
        aria('haspopup', 'false'),
        aria('expanded', 'false'),
        aria('activedescendant', 'false')
    ]
})
