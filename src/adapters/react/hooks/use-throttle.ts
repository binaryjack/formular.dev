/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

type Timer = ReturnType<typeof setTimeout>
type SomeFunction = (...args: any[]) => void
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */

const useThrottle = <Func extends SomeFunction | void>(func: Func, delay = 1000) => {
    let lastArgs: any[] | undefined
    const lastCall = useRef<number>(Number.NEGATIVE_INFINITY)
    const wait = useRef<number>(Number.NEGATIVE_INFINITY)
    const timer = useRef<Timer>()

    useEffect(() => {
        return () => {
            if (!timer.current) return
            clearTimeout(timer.current)
        }
    }, [])

    const throttledFunction = ((...args: any[]) => {
        const lastArgsString = JSON.stringify(lastArgs)
        if (lastArgsString === JSON.stringify(args)) return

        wait.current = lastCall.current + delay - Date.now()
        clearTimeout(timer.current)

        if (wait.current <= 0) {
            // console.log('DEBOUNCE')
            const newTimer = setTimeout(() => {
                // console.log('THROTTLE______FUNCTION EXEC')
                func?.(...args)
                lastCall.current = Date.now()
            }, delay)
            clearTimeout(timer.current)
            timer.current = newTimer
        }
    }) as Func
    return throttledFunction
}
export default useThrottle
