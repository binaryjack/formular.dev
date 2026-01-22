import * as Clear from './prototype/clear'
import * as HandleOnChanged from './prototype/handle-on-changed'
import * as HandleOnClear from './prototype/handle-on-clear'
import * as HandleOnSelected from './prototype/handle-on-selected'
import * as Initialize from './prototype/initialize'
import * as OnSelectItem from './prototype/on-select-item'
import * as Ref from './prototype/ref'
import * as Register from './prototype/register'
import * as SelectBaseInput from './select-base-input'
import * as SelectBaseInputTypes from './select-base-input.types'

describe('select-base variant exports', () => {
    it('should export objects and functions', () => {
        expect(SelectBaseInput).toBeDefined()
        expect(SelectBaseInputTypes).toBeDefined()
        expect(Clear).toBeDefined()
        expect(HandleOnChanged).toBeDefined()
        expect(HandleOnClear).toBeDefined()
        expect(HandleOnSelected).toBeDefined()
        expect(Initialize).toBeDefined()
        expect(OnSelectItem).toBeDefined()
        expect(Ref).toBeDefined()
        expect(Register).toBeDefined()
    })
})
