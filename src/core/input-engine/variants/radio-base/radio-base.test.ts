import * as HandleOnChanged from './prototype/handle-on-changed'
import * as Initialize from './prototype/initialize'
import * as Ref from './prototype/ref'
import * as RefOption from './prototype/ref-option'
import * as Register from './prototype/register'
import * as RegisterLabel from './prototype/register-label'
import * as RegisterOption from './prototype/register-option'
import * as RadioBaseInput from './radio-base-input'
import * as RadioBaseInputTypes from './radio-base-input.types'

describe('radio-base variant exports', () => {
    it('should export objects and functions', () => {
        expect(RadioBaseInput).toBeDefined()
        expect(RadioBaseInputTypes).toBeDefined()
        expect(HandleOnChanged).toBeDefined()
        expect(Initialize).toBeDefined()
        expect(RefOption).toBeDefined()
        expect(Ref).toBeDefined()
        expect(RegisterLabel).toBeDefined()
        expect(RegisterOption).toBeDefined()
        expect(Register).toBeDefined()
    })
})
