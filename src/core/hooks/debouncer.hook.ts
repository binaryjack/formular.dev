import { useEffect, useState } from 'react'

const useDebouncer = (value: any, delay: number, callback: Function) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
            callback(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

export default useDebouncer
