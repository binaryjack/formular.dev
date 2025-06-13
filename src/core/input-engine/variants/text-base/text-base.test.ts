import * as HandleOnChanged from './prototype/handle-on-changed'
import * as HandleOnClear from './prototype/handle-on-clear'
import * as Initialize from './prototype/initialize'
import * as Ref from './prototype/ref'
import * as Register from './prototype/register'
import * as TextBaseInput from './text-base-input'
import * as TextBaseInputTypes from './text-base-input.types'

describe('text-base variant exports', () => {
    it('should export objects and functions', () => {
        expect(TextBaseInput).toBeDefined()
        expect(TextBaseInputTypes).toBeDefined()
        expect(HandleOnChanged).toBeDefined()
        expect(HandleOnClear).toBeDefined()
        expect(Initialize).toBeDefined()
        expect(Ref).toBeDefined()
        expect(Register).toBeDefined()
    })
})
