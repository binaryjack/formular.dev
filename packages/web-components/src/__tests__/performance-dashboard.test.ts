/**
 * Performance Dashboard Tests
 * Following TDD principles with step-by-step minimalistic testing
 */

/// <reference types="jest" />

import { PerformanceDashboard } from '../debugging/performance-dashboard'
import type { DashboardConfig } from '../types/dashboard'

describe('PerformanceDashboard', () => {
  let dashboard: PerformanceDashboard;
  let mockDocument: any;
  let mockElement: any;
  let mockPerformance: any;

  beforeEach(() => {
    // Mock DOM elements for testing
    mockElement = {
      innerHTML: '',
      id: '',
      textContent: '',
      className: '',
      classList: {
        add: jest.fn(),
        remove: jest.fn()
      },
      appendChild: jest.fn(),
      remove: jest.fn(),
      querySelector: jest.fn(),
      getElementById: jest.fn(),
      insertBefore: jest.fn(),
      querySelectorAll: jest.fn().mockReturnValue([]),
      addEventListener: jest.fn()
    };

    mockDocument = {
      createElement: jest.fn().mockReturnValue(mockElement),
      body: {
        appendChild: jest.fn()
      },
      head: {
        appendChild: jest.fn()
      },
      getElementById: jest.fn().mockReturnValue(mockElement),
      querySelector: jest.fn().mockReturnValue(mockElement)
    };

    mockPerformance = {
      now: jest.fn().mockReturnValue(100),
      memory: {
        usedJSHeapSize: 1024 * 1024 * 10, // 10MB
        totalJSHeapSize: 1024 * 1024 * 50, // 50MB
        jsHeapSizeLimit: 1024 * 1024 * 100 // 100MB
      }
    };

    // Mock global objects
    global.document = mockDocument;
    global.window = {
      dashboard: null
    } as any;
    global.performance = mockPerformance as any;
    global.URL = {
      createObjectURL: jest.fn().mockReturnValue('blob:url'),
      revokeObjectURL: jest.fn()
    } as any;
    global.Blob = jest.fn() as any;
    global.setInterval = jest.fn().mockReturnValue(123);
    global.clearInterval = jest.fn();
    global.console = {
      log: jest.fn()
    } as any;

    const config: DashboardConfig = {
      visible: true,
      updateInterval: 1000
    };
    dashboard = new PerformanceDashboard(config);
  });

  afterEach(() => {
    if (dashboard) {
      dashboard.destroy();
    }
  });

  describe('Dashboard Initialization', () => {
    test('should create dashboard instance with initial metrics', () => {
      expect(dashboard.metrics).toBeDefined();
      expect(dashboard.metrics.components).toBeInstanceOf(Map);
      expect(dashboard.metrics.events).toEqual([]);
      expect(dashboard.metrics.memory).toBeDefined();
      expect(dashboard.metrics.renders).toEqual([]);
    });

    test('should have performance thresholds defined', () => {
      expect(dashboard.metrics.thresholds.renderTime).toBe(16);
      expect(dashboard.metrics.thresholds.memoryGrowth).toBe(50);
      expect(dashboard.metrics.thresholds.eventQueue).toBe(100);
    });

    test('should initialize as visible by default', () => {
      expect(dashboard.isVisible).toBe(true);
    });

    test('should accept custom configuration', () => {
      const customConfig: DashboardConfig = {
        visible: false,
        updateInterval: 2000,
        thresholds: {
          renderTime: 20,
          memoryGrowth: 100
        }
      };

      const customDashboard = new PerformanceDashboard(customConfig);
      
      expect(customDashboard.isVisible).toBe(false);
      expect(customDashboard.metrics.thresholds.renderTime).toBe(20);
      expect(customDashboard.metrics.thresholds.memoryGrowth).toBe(100);
      expect(customDashboard.metrics.thresholds.eventQueue).toBe(100); // Should keep default
      
      customDashboard.destroy();
    });
  });

  describe('Component Tracking', () => {
    test('should track component registration', () => {
      const componentId = 'test-component-1';
      const metadata = { type: 'test', props: { name: 'Test' } };

      dashboard.trackComponent(componentId, metadata);

      expect(dashboard.metrics.components.has(componentId)).toBe(true);
      const component = dashboard.metrics.components.get(componentId);
      expect(component?.id).toBe(componentId);
      expect(component?.type).toBe('test');
      expect(component?.renders).toBe(0);
      expect(component?.events).toBe(0);
      expect(component?.metadata).toEqual(metadata);
    });

    test('should track multiple components', () => {
      dashboard.trackComponent('component-1');
      dashboard.trackComponent('component-2');

      expect(dashboard.metrics.components.size).toBe(2);
    });

    test('should handle component without metadata', () => {
      dashboard.trackComponent('simple-component');
      
      const component = dashboard.metrics.components.get('simple-component');
      expect(component?.type).toBe('unknown');
      expect(component?.metadata).toEqual({});
    });
  });

  describe('Render Tracking', () => {
    test('should track component render times', () => {
      const componentId = 'test-component';
      dashboard.trackComponent(componentId);

      dashboard.trackRender(componentId, 15.5);

      const component = dashboard.metrics.components.get(componentId);
      expect(component?.renders).toBe(1);
      expect(component?.lastRender).toBe(15.5);
      expect(dashboard.metrics.renders).toContain(15.5);
    });

    test('should limit render history to maxRenderHistory entries', () => {
      const componentId = 'test-component';
      dashboard.trackComponent(componentId);

      // Add 150 renders (default max is 100)
      for (let i = 0; i < 150; i++) {
        dashboard.trackRender(componentId, i);
      }

      expect(dashboard.metrics.renders.length).toBe(100);
      // Should keep the latest renders (50-149)
      expect(dashboard.metrics.renders[0]).toBe(50);
      expect(dashboard.metrics.renders[99]).toBe(149);
    });

    test('should handle render tracking for non-existent component', () => {
      dashboard.trackRender('non-existent', 10);
      
      expect(dashboard.metrics.renders).toContain(10);
      expect(dashboard.metrics.components.has('non-existent')).toBe(false);
    });
  });

  describe('Event Tracking', () => {
    test('should track component events', () => {
      const componentId = 'test-component';
      dashboard.trackComponent(componentId);

      dashboard.trackEvent(componentId, 'click', { target: 'button' });

      expect(dashboard.metrics.events.length).toBe(1);
      const event = dashboard.metrics.events[0];
      expect(event.componentId).toBe(componentId);
      expect(event.eventType).toBe('click');
      expect(event.data?.target).toBe('button');
      expect(event.timestamp).toBe(100); // From mocked performance.now()

      const component = dashboard.metrics.components.get(componentId);
      expect(component?.events).toBe(1);
    });

    test('should limit event history to maxEventHistory entries', () => {
      const componentId = 'test-component';
      dashboard.trackComponent(componentId);

      // Add 60 events (default max is 50)
      for (let i = 0; i < 60; i++) {
        dashboard.trackEvent(componentId, `event-${i}`);
      }

      expect(dashboard.metrics.events.length).toBe(50);
      // Should keep the latest events (10-59)
      expect(dashboard.metrics.events[0].eventType).toBe('event-10');
      expect(dashboard.metrics.events[49].eventType).toBe('event-59');
    });

    test('should handle event tracking for non-existent component', () => {
      dashboard.trackEvent('non-existent', 'test-event');
      
      expect(dashboard.metrics.events.length).toBe(1);
      expect(dashboard.metrics.components.has('non-existent')).toBe(false);
    });
  });

  describe('Memory Monitoring', () => {
    test('should update memory metrics', () => {
      dashboard.updateMemoryMetrics();

      expect(dashboard.metrics.memory.usage).toBe(10); // 10MB from mock
      expect(dashboard.metrics.memory.peak).toBe(10);
    });

    test('should track peak memory usage', () => {
      dashboard.updateMemoryMetrics();
      expect(dashboard.metrics.memory.peak).toBe(10);

      // Simulate higher memory usage
      if (mockPerformance.memory) {
        mockPerformance.memory.usedJSHeapSize = 1024 * 1024 * 20; // 20MB
      }
      dashboard.updateMemoryMetrics();

      expect(dashboard.metrics.memory.usage).toBe(20);
      expect(dashboard.metrics.memory.peak).toBe(20);

      // Lower memory shouldn't change peak
      if (mockPerformance.memory) {
        mockPerformance.memory.usedJSHeapSize = 1024 * 1024 * 15; // 15MB
      }
      dashboard.updateMemoryMetrics();

      expect(dashboard.metrics.memory.usage).toBe(15);
      expect(dashboard.metrics.memory.peak).toBe(20);
    });

    test('should determine memory status correctly', () => {
      dashboard.metrics.memory.usage = 30;
      let status = dashboard.getMemoryStatus();
      expect(status.status).toBe('WATCH');
      expect(status.className).toBe('status-warning');

      dashboard.metrics.memory.usage = 60;
      status = dashboard.getMemoryStatus();
      expect(status.status).toBe('HIGH');
      expect(status.className).toBe('status-error');

      dashboard.metrics.memory.usage = 20;
      status = dashboard.getMemoryStatus();
      expect(status.status).toBe('OK');
      expect(status.className).toBe('status-ok');
    });

    test('should handle missing performance.memory gracefully', () => {
      delete mockPerformance.memory;

      expect(() => {
        dashboard.updateMemoryMetrics();
      }).not.toThrow();
    });
  });

  describe('Dashboard Controls', () => {
    test('should clear all metrics', () => {
      dashboard.trackComponent('test-1');
      dashboard.trackEvent('test-1', 'click');
      dashboard.trackRender('test-1', 15);

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

    test('should export metrics', () => {
      dashboard.trackComponent('test-component');
      dashboard.trackRender('test-component', 12.5);
      dashboard.trackEvent('test-component', 'click');

      // Mock DOM elements for export
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn()
      };
      mockDocument.createElement = jest.fn().mockReturnValue(mockLink);

      dashboard.exportMetrics();

      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toMatch(/performance-metrics-\d+\.json/);
    });
  });

  describe('Performance Benchmarks', () => {
    test('should run benchmark test with default options', () => {
      const consoleSpy = jest.spyOn(global.console, 'log');

      dashboard.runBenchmark();

      expect(consoleSpy).toHaveBeenCalledWith('🏁 Starting benchmark...');
      expect(dashboard.metrics.components.size).toBe(100);
      expect(dashboard.metrics.renders.length).toBe(100);
      expect(dashboard.metrics.events.length).toBe(50); // Limited to 50
    });

    test('should run benchmark with custom options', () => {
      dashboard.runBenchmark({
        componentCount: 50,
        renderCount: 50,
        eventCount: 25
      });

      expect(dashboard.metrics.components.size).toBe(50);
      expect(dashboard.metrics.renders.length).toBe(50);
      expect(dashboard.metrics.events.length).toBe(25);
    });
  });

  describe('Error Handling', () => {
    test('should handle missing DOM elements gracefully', () => {
      mockDocument.getElementById = jest.fn().mockReturnValue(null);

      expect(() => {
        dashboard.updateDisplay();
      }).not.toThrow();
    });

    test('should handle missing performance object', () => {
      global.performance = undefined as any;

      expect(() => {
        dashboard.updateMemoryMetrics();
      }).not.toThrow();
    });

    test('should handle missing setInterval', () => {
      global.setInterval = undefined as any;

      expect(() => {
        new PerformanceDashboard();
      }).not.toThrow();
    });
  });

  describe('TypeScript Type Safety', () => {
    test('should enforce proper types for component metadata', () => {
      const metadata: Record<string, any> = {
        type: 'input',
        props: { value: 'test' },
        nested: { data: 123 }
      };

      dashboard.trackComponent('typed-component', metadata);
      
      const component = dashboard.metrics.components.get('typed-component');
      expect(component?.metadata).toEqual(metadata);
    });

    test('should enforce proper types for event data', () => {
      const eventData: Record<string, any> = {
        target: 'button',
        coordinates: { x: 100, y: 200 },
        modifiers: ['ctrl', 'shift']
      };

      dashboard.trackComponent('test-component');
      dashboard.trackEvent('test-component', 'click', eventData);
      
      const event = dashboard.metrics.events[0];
      expect(event.data).toEqual(eventData);
    });
  });
});
