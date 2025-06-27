import '@testing-library/jest-dom';

// Setup for web components testing
class MockCustomElements {
  static readonly define = jest.fn();
  static readonly get = jest.fn();
  static readonly whenDefined = jest.fn(() => Promise.resolve());
}

// Mock customElements if not available in test environment
if (!global.customElements) {
  global.customElements = MockCustomElements as any;
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock CSS custom properties
global.CSS = {
  ...global.CSS,
  supports: jest.fn(() => true),
};
