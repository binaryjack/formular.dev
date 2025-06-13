import { createObservableSubjectMock } from '@core/observers/observable-subject/observable-subject-mock-builder'

describe('createObservableSubjectMock', () => {
    it('should create a subject with provided strong observers', () => {
        const mockFn = jest.fn()
        const subject = createObservableSubjectMock({ strongObservers: [mockFn] })
        subject.trigger()
        expect(mockFn).toHaveBeenCalled()
    })

    it('should create a subject with provided weak observers', () => {
        const mockFn = jest.fn()
        const subject = createObservableSubjectMock({ weakObservers: [mockFn] })
        subject.trigger()
        expect(mockFn).toHaveBeenCalled()
    })

    it('should allow mixing strong and weak observers', () => {
        const strong = jest.fn()
        const weak = jest.fn()
        const subject = createObservableSubjectMock({
            strongObservers: [strong],
            weakObservers: [weak]
        })
        subject.trigger()
        expect(strong).toHaveBeenCalled()
        expect(weak).toHaveBeenCalled()
    })
})
