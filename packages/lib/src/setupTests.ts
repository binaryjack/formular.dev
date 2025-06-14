// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// Setup for formular.dev.lib testing
// Add any global test setup here if needed

// Mock console.warn and console.error to avoid noise in tests
const originalWarn = console.warn
const originalError = console.error

beforeEach(() => {
    console.warn = jest.fn()
    console.error = jest.fn()
})

afterEach(() => {
    console.warn = originalWarn
    console.error = originalError
})
