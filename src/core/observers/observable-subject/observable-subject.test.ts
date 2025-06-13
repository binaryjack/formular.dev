import { ObservableSubject } from './observable-subject'

describe('ObservableSubject', () => {
    it('should initialize with empty observer lists', () => {
        // @ts-ignore
        const subject = new ObservableSubject()
        expect(subject.observersWeak).toEqual([])
        expect(subject.observersStrong).toEqual([])
        expect(typeof subject.cleanupRegistry).toBe('object')
    })

    it('should allow subscribing and triggering strong observers', () => {
        // @ts-ignore
        const subject = new ObservableSubject()
        const mockFn = jest.fn()
        subject.subscribe(mockFn, false)
        subject.trigger()
        expect(mockFn).toHaveBeenCalled()
    })

    it('should allow unsubscribing strong observers', () => {
        // @ts-ignore
        const subject = new ObservableSubject()
        const mockFn = jest.fn()
        subject.subscribe(mockFn, false)
        subject.unSubscribe(mockFn, false)
        subject.trigger()
        expect(mockFn).not.toHaveBeenCalled()
    })

    it('should allow unsubscribing all strong observers', () => {
        // @ts-ignore
        const subject = new ObservableSubject()
        const mockFn1 = jest.fn()
        const mockFn2 = jest.fn()
        subject.subscribe(mockFn1, false)
        subject.subscribe(mockFn2, false)
        subject.unSubscribeAll(false)
        subject.trigger()
        expect(mockFn1).not.toHaveBeenCalled()
        expect(mockFn2).not.toHaveBeenCalled()
    })
})
