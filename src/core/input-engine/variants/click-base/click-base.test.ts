import * as ClickBaseInput from './click-base-input'
import * as ClickBaseInputTypes from './click-base-input.types'
import * as Initialize from './prototype/initialize'
import * as OnClickHandle from './prototype/on-click-handle'

describe('click-base variant exports', () => {
    it('should export objects and functions', () => {
        expect(ClickBaseInput).toBeDefined()
        expect(ClickBaseInputTypes).toBeDefined()
        expect(Initialize).toBeDefined()
        expect(OnClickHandle).toBeDefined()
    })
})
