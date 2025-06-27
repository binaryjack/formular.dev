/**
 * Performance Dashboard Tests - TypeScript
 * Simple TDD tests for the dashboard functionality
 */

import { PerformanceDashboard } from '../debugging/performance-dashboard';

// Simple mocks
const mockPerformance = {
  now: () => 100,
  memory: {
    usedJSHeapSize: 1024 * 1024 * 10, // 10MB
    totalJSHeapSize: 1024 * 1024 * 50,
    jsHeapSizeLimit: 1024 * 1024 * 100
  }
};

const mockDocument = {
  createElement: () => ({
    innerHTML: '',
    id: '',
    textContent: '',
    classList: { add: jest.fn(), remove: jest.fn() },
    appendChild: jest.fn(),
    querySelector: () => null,
    addEventListener: jest.fn()
  }),
  body: { appendChild: jest.fn() },
  head: { appendChild: jest.fn() },
  getElementById: () => null,
  querySelector: () => null
};

// Mock globals
Object.defineProperty(global, 'performance', { value: mockPerformance, writable: true });
Object.defineProperty(global, 'document', { value: mockDocument, writable: true });
Object.defineProperty(global, 'window', { value: {}, writable: true });
Object.defineProperty(global, 'setInterval', { value: jest.fn(), writable: true });
Object.defineProperty(global, 'clearInterval', { value: jest.fn(), writable: true });
Object.defineProperty(global, 'URL', { 
  value: { 
    createObjectURL: jest.fn().mockReturnValue('blob:url'),
    revokeObjectURL: jest.fn()
  }, 
  writable: true 
});
Object.defineProperty(global, 'Blob', { value: jest.fn(), writable: true });

describe('PerformanceDashboard', () => {
  let dashboard: PerformanceDashboard;

  beforeEach(() => {
    dashboard = new PerformanceDashboard({ visible: true });
  });

  afterEach(() => {
    dashboard?.destroy();
  });

  describe('Core Functionality', () => {
    test('should initialize with default metrics', () => {
      expect(dashboard.metrics).toBeDefined();
      expect(dashboard.metrics.components).toBeInstanceOf(Map);
      expect(dashboard.metrics.events).toEqual([]);
      expect(dashboard.metrics.renders).toEqual([]);
      expect(dashboard.isVisible).toBe(true);
    });

    test('should track component registration', () => {
      dashboard.trackComponent('test-component', { type: 'input' });
      
      expect(dashboard.metrics.components.has('test-component')).toBe(true);
      const component = dashboard.metrics.components.get('test-component');
      expect(component?.type).toBe('input');
      expect(component?.renders).toBe(0);
      expect(component?.events).toBe(0);
    });

    test('should track render performance', () => {
      dashboard.trackComponent('test-component');
      dashboard.trackRender('test-component', 15.5);
      
      const component = dashboard.metrics.components.get('test-component');
      expect(component?.renders).toBe(1);
      expect(component?.lastRender).toBe(15.5);
      expect(dashboard.metrics.renders).toContain(15.5);
    });

    test('should track events', () => {
      dashboard.trackComponent('test-component');
      dashboard.trackEvent('test-component', 'click', { target: 'button' });
      
      expect(dashboard.metrics.events.length).toBe(1);
      const event = dashboard.metrics.events[0];
      expect(event.componentId).toBe('test-component');
      expect(event.eventType).toBe('click');
      expect(event.data?.target).toBe('button');
      
      const component = dashboard.metrics.components.get('test-component');
      expect(component?.events).toBe(1);
    });

    test('should update memory metrics', () => {
      dashboard.updateMemoryMetrics();
      
      expect(dashboard.metrics.memory.usage).toBe(10); // 10MB from mock
      expect(dashboard.metrics.memory.peak).toBe(10);
    });

    test('should determine memory status', () => {
      dashboard.metrics.memory.usage = 20;
      let status = dashboard.getMemoryStatus();
      expect(status.status).toBe('OK');
      
      dashboard.metrics.memory.usage = 45;
      status = dashboard.getMemoryStatus();
      expect(status.status).toBe('WATCH');
      
      dashboard.metrics.memory.usage = 60;
      status = dashboard.getMemoryStatus();
      expect(status.status).toBe('HIGH');
    });

    test('should clear metrics', () => {
      dashboard.trackComponent('test');
      dashboard.trackRender('test', 10);
      dashboard.trackEvent('test', 'click');
      
      dashboard.clearMetrics();
      
      expect(dashboard.metrics.components.size).toBe(0);
      expect(dashboard.metrics.events.length).toBe(0);
      expect(dashboard.metrics.renders.length).toBe(0);
    });

    test('should toggle visibility', () => {
      expect(dashboard.isVisible).toBe(true);
      
      dashboard.toggle();
      expect(dashboard.isVisible).toBe(false);
      
      dashboard.toggle();
      expect(dashboard.isVisible).toBe(true);
    });

    test('should run benchmark', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      dashboard.runBenchmark({ componentCount: 10, renderCount: 10, eventCount: 5 });
      
      expect(dashboard.metrics.components.size).toBe(10);
      expect(dashboard.metrics.renders.length).toBe(10);
      expect(dashboard.metrics.events.length).toBe(5);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Configuration', () => {
    test('should accept custom configuration', () => {
      const customDashboard = new PerformanceDashboard({
        visible: false,
        thresholds: { renderTime: 20, memoryGrowth: 100, eventQueue: 200 }
      });
      
      expect(customDashboard.isVisible).toBe(false);
      expect(customDashboard.metrics.thresholds.renderTime).toBe(20);
      expect(customDashboard.metrics.thresholds.memoryGrowth).toBe(100);
      expect(customDashboard.metrics.thresholds.eventQueue).toBe(200);
      
      customDashboard.destroy();
    });
  });
});
