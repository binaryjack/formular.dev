import * as OptionBaseInput from './option-base-input'
import * as OptionBaseInputTypes from './option-base-input.types'
import * as CheckOptionsInitialized from './prototype/check-options-initialized'
import * as GetOptionById from './prototype/get-option-by-id'
import * as GetOptionBySequenceId from './prototype/get-option-by-sequence-id'
import * as GetOptionByValue from './prototype/get-option-by-value'
import * as GetSelectedValue from './prototype/get-selected-value'
import * as Initialize from './prototype/initialize'
import * as TryGetOptionByIdOrValue from './prototype/try-get-option-by-id-or-value'
import * as TryGetOptionBySequenceIdThenIdOrValue from './prototype/try-get-option-by-sequence-id-then-id-or-value'

describe('option-based variant exports', () => {
    it('should export objects and functions', () => {
        expect(OptionBaseInput).toBeDefined()
        expect(OptionBaseInputTypes).toBeDefined()
        expect(CheckOptionsInitialized).toBeDefined()
        expect(GetOptionById).toBeDefined()
        expect(GetOptionBySequenceId).toBeDefined()
        expect(GetOptionByValue).toBeDefined()
        expect(GetSelectedValue).toBeDefined()
        expect(Initialize).toBeDefined()
        expect(TryGetOptionByIdOrValue).toBeDefined()
        expect(TryGetOptionBySequenceIdThenIdOrValue).toBeDefined()
    })
})
