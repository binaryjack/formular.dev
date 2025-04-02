import { DateObject } from '../src/components/datePicker/core/DateObject.object'
describe('DateObject', () => {
    it('should create a DateObject with the correct date', () => {
        const date = new Date(2023, 9, 15) // October 15, 2023
        const dateObject = new DateObject(date)
        expect(dateObject.year).toBe(2023)
        expect(dateObject.month).toBe(10) // Months are 1-based in DateObject
        expect(dateObject.day).toBe(15)
    })

    it('should correctly handle leap years', () => {
        const leapYearDate = new Date(2024, 1, 29) // February 29, 2024
        const dateObject = new DateObject(leapYearDate)
        expect(dateObject.year).toBe(2024)
        expect(dateObject.month).toBe(2)
        expect(dateObject.day).toBe(29)
    })

    it('should correctly handle non-leap years', () => {
        const nonLeapYearDate = new Date(2023, 1, 28) // February 28, 2023
        const dateObject = new DateObject(nonLeapYearDate)
        expect(dateObject.year).toBe(2023)
        expect(dateObject.month).toBe(2)
        expect(dateObject.day).toBe(28)
    })

    it('should correctly format the date as a string', () => {
        const date = new Date(2023, 9, 15) // October 15, 2023
        const dateObject = new DateObject(date)
        expect(dateObject.toString !== undefined).toBeTruthy()
        expect(dateObject.toString !== null).toBeTruthy()
        if (dateObject.toString) {
            expect(dateObject.toString('yyyy/mm/dd')).toBe('2023-10-15')
        }
    })
})
