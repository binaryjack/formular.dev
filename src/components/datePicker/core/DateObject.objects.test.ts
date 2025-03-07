import { describe, expect, it } from '@jest/globals'

import { DateObject } from './DateObject.objects'

describe('DateObject', () => {
    it('should initialize with current date if no date is provided', () => {
        const dateObject = new DateObject()
        const currentDate = new Date()
        expect(dateObject?.day?.()).toBe(currentDate.getDate())
        expect(dateObject?.month?.()).toBe(currentDate.getMonth())
        expect(dateObject?.year?.()).toBe(currentDate.getFullYear())
    })

    it('should initialize with provided date', () => {
        const date = new Date(2025, 2, 7) // March 7, 2025
        const dateObject = new DateObject(date)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should set date from strings', () => {
        const dateObject = new DateObject()
        dateObject.setFromStrings?.('07', '02', '2025')
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should set date from numbers', () => {
        const dateObject = new DateObject()
        dateObject.setFromNumbers?.(7, 2, 2025)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should set date from Date object', () => {
        const date = new Date(2025, 2, 7)
        const dateObject = new DateObject()
        dateObject?.setFromDate?.(date)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should set date from timestamp', () => {
        const timestamp = new Date(2025, 2, 7).getTime()
        const dateObject = new DateObject()
        dateObject.setFromNumber?.(timestamp)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should set date from object', () => {
        const date = { day: 7, month: 2, year: 2025 }
        const dateObject = new DateObject()
        dateObject.setFromObject?.(date)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should validate input date', () => {
        const dateObject = new DateObject()
        const isValid = dateObject?.validateInput?.('07/02/2025', 'mm/dd/yyyy')
        expect(isValid).toBe(true)
        expect(dateObject?.day?.()).toBe(7)
        expect(dateObject?.month?.()).toBe(2)
        expect(dateObject?.year?.()).toBe(2025)
    })

    it('should return correct string format', () => {
        const dateObject = new DateObject(new Date(2025, 2, 7))
        expect(dateObject.toString?.('mm/dd/yyyy')).toBe('02/07/2025')
        expect(dateObject.toString?.('dd/mm/yyyy')).toBe('07/02/2025')
        expect(dateObject.toString?.('yyyy/mm/dd')).toBe('2025/02/07')
    })

    it('should return correct day name', () => {
        const dateObject = new DateObject(new Date(2025, 2, 7))
        expect(dateObject.getDayName?.()).toBe('Friday')
    })

    it('should return correct month name', () => {
        const dateObject = new DateObject(new Date(2025, 2, 7))
        expect(dateObject.getMonthName?.()).toBe('March')
    })
})
