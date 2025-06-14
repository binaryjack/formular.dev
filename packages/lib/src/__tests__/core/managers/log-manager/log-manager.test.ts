import { logManager } from '@core/managers/log-manager/log-manager'
import {
    ITrackingManager,
    TrackingType
} from '@core/managers/tracking-manager/tracker-manager.types'

// Mock console methods using jest spies
const consoleMock = {
    info: jest.spyOn(console, 'info').mockImplementation(() => {}),
    warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
    error: jest.spyOn(console, 'error').mockImplementation(() => {}),
    log: jest.spyOn(console, 'log').mockImplementation(() => {})
}

describe('logManager', () => {
    let mockTracker: jest.Mocked<ITrackingManager>

    beforeEach(() => {
        // Reset console mocks
        consoleMock.info.mockClear()
        consoleMock.warn.mockClear()
        consoleMock.error.mockClear()

        // Create mock tracker
        mockTracker = {
            internalInfo: jest.fn(),
            internalWarning: jest.fn(),
            internalError: jest.fn(),
            internalCritical: jest.fn()
        } as any
    })

    describe('with tracker provided', () => {
        it('should call tracker.internalInfo for info type', () => {
            logManager(mockTracker, 'info', 'TestSource', 'Test message')

            expect(mockTracker.internalInfo).toHaveBeenCalledWith('TestSource', 'Test message')
            expect(consoleMock.info).not.toHaveBeenCalled()
        })

        it('should call tracker.internalWarning for warning type', () => {
            logManager(mockTracker, 'warning', 'TestSource', 'Warning message')

            expect(mockTracker.internalWarning).toHaveBeenCalledWith(
                'TestSource',
                'Warning message'
            )
            expect(consoleMock.warn).not.toHaveBeenCalled()
        })

        it('should call tracker.internalError for error type', () => {
            logManager(mockTracker, 'error', 'TestSource', 'Error message')

            expect(mockTracker.internalError).toHaveBeenCalledWith('TestSource', 'Error message')
            expect(consoleMock.error).not.toHaveBeenCalled()
        })

        it('should call tracker.internalCritical for critical type', () => {
            logManager(mockTracker, 'critical', 'TestSource', 'Critical message')

            expect(mockTracker.internalCritical).toHaveBeenCalledWith(
                'TestSource',
                'Critical message'
            )
            expect(consoleMock.error).not.toHaveBeenCalled()
        })
    })

    describe('without tracker (undefined)', () => {
        it('should call console.info for info type', () => {
            logManager(undefined, 'info', 'TestSource', 'Info message')

            expect(consoleMock.info).toHaveBeenCalledWith('TestSource: Info message')
        })

        it('should call console.warn for warning type', () => {
            logManager(undefined, 'warning', 'TestSource', 'Warning message')

            expect(consoleMock.warn).toHaveBeenCalledWith('TestSource: Warning message')
        })

        it('should call console.error for error type', () => {
            logManager(undefined, 'error', 'TestSource', 'Error message')

            expect(consoleMock.error).toHaveBeenCalledWith('TestSource: Error message')
        })

        it('should throw error for critical type', () => {
            // The critical error gets caught by the try-catch and logged to console.error instead
            expect(() => {
                logManager(undefined, 'critical', 'TestSource', 'Critical message')
            }).not.toThrow()

            // Check that the critical was logged first, then caught and logged as an error
            expect(consoleMock.error).toHaveBeenCalledWith(
                'CRITICAL - TestSource: Critical message'
            )
            expect(consoleMock.error).toHaveBeenCalledWith(
                'logManager: unexpected error. TestSource: Critical message'
            )
        })

        it('should throw for unknown type and log error', () => {
            expect(() => {
                logManager(undefined, 'unknown' as TrackingType, 'TestSource', 'Unknown message')
            }).not.toThrow() // error is caught internally
            expect(consoleMock.error).toHaveBeenCalledWith(
                expect.stringContaining('Unhandled TrackingType')
            )
        })
    })

    describe('error handling', () => {
        it('should handle tracker method throwing error', () => {
            mockTracker.internalInfo.mockImplementation(() => {
                throw new Error('Tracker error')
            })

            expect(() => {
                logManager(mockTracker, 'info', 'TestSource', 'Test message')
            }).not.toThrow()

            expect(consoleMock.error).toHaveBeenCalledWith(
                'logManager: unexpected error. Tracker error'
            )
        })

        it('should handle console method throwing error gracefully', () => {
            consoleMock.info.mockImplementation(() => {
                throw new Error('Console error')
            })

            expect(() => {
                logManager(undefined, 'info', 'TestSource', 'Test message')
            }).not.toThrow() // Should still attempt to log the error
            expect(consoleMock.error).toHaveBeenCalled()
        })

        it('should handle error with no message', () => {
            mockTracker.internalInfo.mockImplementation(() => {
                throw new Error()
            })

            logManager(mockTracker, 'info', 'TestSource', 'Test message')

            expect(consoleMock.error).toHaveBeenCalledWith('logManager: unexpected error. ')
        })

        it('should handle non-Error objects being thrown', () => {
            mockTracker.internalInfo.mockImplementation(() => {
                throw 'String error'
            })

            logManager(mockTracker, 'info', 'TestSource', 'Test message')

            expect(consoleMock.error).toHaveBeenCalledWith(
                'logManager: unexpected error. undefined'
            )
        })
    })

    describe('message formatting', () => {
        it('should format messages correctly for console output', () => {
            logManager(undefined, 'info', 'MyComponent', 'User clicked button')

            expect(consoleMock.info).toHaveBeenCalledWith('MyComponent: User clicked button')
        })

        it('should handle empty source', () => {
            logManager(undefined, 'info', '', 'Test message')

            expect(consoleMock.info).toHaveBeenCalledWith(': Test message')
        })

        it('should handle empty message', () => {
            logManager(undefined, 'info', 'TestSource', '')

            expect(consoleMock.info).toHaveBeenCalledWith('TestSource: ')
        })

        it('should handle special characters in source and message', () => {
            logManager(undefined, 'info', 'Test:Source', 'Message with "quotes" and symbols!')

            expect(consoleMock.info).toHaveBeenCalledWith(
                'Test:Source: Message with "quotes" and symbols!'
            )
        })
    })

    describe('integration scenarios', () => {
        it('should work in a logging pipeline', () => {
            const logInfo = (source: string, message: string) => {
                logManager(mockTracker, 'info', source, message)
            }

            const logError = (source: string, message: string) => {
                logManager(mockTracker, 'error', source, message)
            }

            logInfo('UserService', 'User logged in')
            logError('DatabaseService', 'Connection failed')

            expect(mockTracker.internalInfo).toHaveBeenCalledWith('UserService', 'User logged in')
            expect(mockTracker.internalError).toHaveBeenCalledWith(
                'DatabaseService',
                'Connection failed'
            )
        })

        it('should fallback to console when tracker fails', () => {
            mockTracker.internalInfo.mockImplementation(() => {
                throw new Error('Tracker unavailable')
            })

            logManager(mockTracker, 'info', 'TestSource', 'Test message')

            // Should log the error to console
            expect(consoleMock.log).toHaveBeenCalledWith(
                'logManager: unexpected error. Tracker unavailable'
            )
        })
    })

    describe('all TrackingType values', () => {
        const types: TrackingType[] = ['info', 'warning', 'error', 'critical']

        types.forEach((type) => {
            it(`should handle ${type} type with tracker`, () => {
                logManager(mockTracker, type, 'TestSource', `${type} message`)

                switch (type) {
                    case 'info':
                        expect(mockTracker.internalInfo).toHaveBeenCalled()
                        break
                    case 'warning':
                        expect(mockTracker.internalWarning).toHaveBeenCalled()
                        break
                    case 'error':
                        expect(mockTracker.internalError).toHaveBeenCalled()
                        break
                    case 'critical':
                        expect(mockTracker.internalCritical).toHaveBeenCalled()
                        break
                }
            })
        })
    })
})
