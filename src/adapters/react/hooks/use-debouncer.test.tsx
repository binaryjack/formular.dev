import { renderHook, act } from '@testing-library/react'
import useDebouncer from './use-debouncer'
import { sleep } from '../../../__tests__/utils/sleep'

describe('useDebouncer', () => {
  it('should return the initial value immediately', () => {
    const callback = jest.fn()
    const { result } = renderHook(({ value }) => useDebouncer(value, 200, callback), {
      initialProps: { value: 'test' },
    })
    expect(result.current).toBe('test')
    expect(callback).not.toHaveBeenCalled()
  })

  it('should update debounced value after delay and call callback', async () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { result, rerender } = renderHook(({ value }) => useDebouncer(value, 200, callback), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    expect(result.current).toBe('first')
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(result.current).toBe('second')
    expect(callback).toHaveBeenCalledWith('second')
    jest.useRealTimers()
  })

  it('should clear timeout on unmount', () => {
    jest.useFakeTimers()
    const callback = jest.fn()
    const { unmount, rerender } = renderHook(({ value }) => useDebouncer(value, 200, callback), {
      initialProps: { value: 'first' },
    })
    rerender({ value: 'second' })
    unmount()
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(callback).not.toHaveBeenCalled()
    jest.useRealTimers()
  })
})
