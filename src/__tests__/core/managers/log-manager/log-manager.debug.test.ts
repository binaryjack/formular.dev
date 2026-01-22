import { logManager } from '@core/managers/log-manager/log-manager'

describe('logManager debug', () => {
    it('should execute basic function call', () => {
        console.log('Test starting...')

        // Test basic function call
        logManager(undefined, 'info', 'TestSource', 'Test message')

        console.log('Test completed.')
    })
})
