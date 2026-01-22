import * as CheckBoxBaseInput from './check-box-base-input'
import * as CheckBoxBaseInputTypes from './check-box-base-input.types'
import * as Initialize from './prototype/initialize'
import * as Ref from './prototype/ref'
import * as Register from './prototype/register'

describe('check-box-base variant exports', () => {
    it('should export objects and functions', () => {
        expect(CheckBoxBaseInput).toBeDefined()
        expect(CheckBoxBaseInputTypes).toBeDefined()
        expect(Register).toBeDefined()
        expect(Ref).toBeDefined()
        expect(Initialize).toBeDefined()
    })
})
