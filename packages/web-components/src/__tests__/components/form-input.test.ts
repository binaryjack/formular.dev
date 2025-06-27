/**
 * Basic test for FormInputElement
 * Following CONTRIBUTING.md: minimalistic testing approach
 */
import { FormInputElement } from '../../components/form-input/form-input'

// Mock Lit dependencies for testing
jest.mock('lit', () => ({
  LitElement: class MockLitElement {
    dispatchEvent = jest.fn();
    updated = jest.fn();
  },
  html: jest.fn(),
  css: jest.fn()
}));

jest.mock('lit/decorators.js', () => ({
  customElement: () => () => {},
  property: () => () => {},
  state: () => () => {}
}));

describe('FormInputElement', () => {
  let component: FormInputElement;

  beforeEach(() => {
    // Basic component instantiation test
    component = new FormInputElement();
  });

  it('should create component instance', () => {
    expect(component).toBeInstanceOf(FormInputElement);
  });

  it('should have default properties', () => {
    expect(component.value).toBe('');
    expect(component.type).toBe('text');
    expect(component.required).toBe(false);
    expect(component.disabled).toBe(false);
  });

  it('should have prototype methods', () => {
    expect(typeof component.validateInput).toBe('function');
    expect(typeof component.clearError).toBe('function');
    expect(typeof component.setError).toBe('function');
  });

  it('should clear error when clearError is called', () => {
    component.error = 'test error';
    component.clearError();
    expect(component.error).toBe('');
  });

  it('should set error when setError is called', () => {
    const errorMessage = 'validation failed';
    component.setError(errorMessage);
    expect(component.error).toBe(errorMessage);
  });
});
