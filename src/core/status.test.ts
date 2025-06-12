import { LoadingStatus } from './status'

describe('LoadingStatus', () => {
    it('should have all expected enum values', () => {
        expect(LoadingStatus.Loaded).toBe('Loaded')
        expect(LoadingStatus.InProgress).toBe('InProgress')
        expect(LoadingStatus.Reload).toBe('Reload')
        expect(LoadingStatus.Error).toBe('Error')
    })

    it('should have exactly 4 enum values', () => {
        const values = Object.values(LoadingStatus)
        expect(values).toHaveLength(4)
        expect(values).toContain('Loaded')
        expect(values).toContain('InProgress')
        expect(values).toContain('Reload')
        expect(values).toContain('Error')
    })

    it('should have correct enum keys', () => {
        const keys = Object.keys(LoadingStatus)
        expect(keys).toHaveLength(4)
        expect(keys).toContain('Loaded')
        expect(keys).toContain('InProgress')
        expect(keys).toContain('Reload')
        expect(keys).toContain('Error')
    })

    it('should allow comparison with string values', () => {
        expect(LoadingStatus.Loaded === 'Loaded').toBe(true)
        expect(LoadingStatus.InProgress === 'InProgress').toBe(true)
        expect(LoadingStatus.Reload === 'Reload').toBe(true)
        expect(LoadingStatus.Error === 'Error').toBe(true)
    })

    it('should work in switch statements', () => {
        const getStatusMessage = (status: LoadingStatus): string => {
            switch (status) {
                case LoadingStatus.Loaded:
                    return 'Content has been loaded successfully'
                case LoadingStatus.InProgress:
                    return 'Loading in progress...'
                case LoadingStatus.Reload:
                    return 'Reloading content...'
                case LoadingStatus.Error:
                    return 'An error occurred while loading'
                default:
                    return 'Unknown status'
            }
        }

        expect(getStatusMessage(LoadingStatus.Loaded)).toBe('Content has been loaded successfully')
        expect(getStatusMessage(LoadingStatus.InProgress)).toBe('Loading in progress...')
        expect(getStatusMessage(LoadingStatus.Reload)).toBe('Reloading content...')
        expect(getStatusMessage(LoadingStatus.Error)).toBe('An error occurred while loading')
    })

    it('should be usable as object keys', () => {
        const statusConfig = {
            [LoadingStatus.Loaded]: { color: 'green', icon: 'check' },
            [LoadingStatus.InProgress]: { color: 'blue', icon: 'spinner' },
            [LoadingStatus.Reload]: { color: 'orange', icon: 'refresh' },
            [LoadingStatus.Error]: { color: 'red', icon: 'error' }
        }

        expect(statusConfig[LoadingStatus.Loaded]).toEqual({ color: 'green', icon: 'check' })
        expect(statusConfig[LoadingStatus.InProgress]).toEqual({ color: 'blue', icon: 'spinner' })
        expect(statusConfig[LoadingStatus.Reload]).toEqual({ color: 'orange', icon: 'refresh' })
        expect(statusConfig[LoadingStatus.Error]).toEqual({ color: 'red', icon: 'error' })
    })

    it('should support type checking', () => {
        const isValidStatus = (value: string): value is LoadingStatus => {
            return Object.values(LoadingStatus).includes(value as LoadingStatus)
        }

        expect(isValidStatus('Loaded')).toBe(true)
        expect(isValidStatus('InProgress')).toBe(true)
        expect(isValidStatus('Reload')).toBe(true)
        expect(isValidStatus('Error')).toBe(true)
        expect(isValidStatus('InvalidStatus')).toBe(false)
        expect(isValidStatus('')).toBe(false)
        expect(isValidStatus('loaded')).toBe(false) // case sensitive
    })
})
