/**
 * Performance Dashboard Types
 * TypeScript interfaces for the performance monitoring system
 */

export interface ComponentMetrics {
  id: string;
  type: string;
  renders: number;
  events: number;
  lastRender?: number;
  createdAt: number;
  metadata?: Record<string, any>;
}

export interface EventMetric {
  componentId: string;
  eventType: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface MemoryMetrics {
  usage: number; // Current usage in MB
  peak: number;  // Peak usage in MB
  limit: number; // Memory limit threshold in MB
}

export interface PerformanceThresholds {
  renderTime: number;    // Maximum render time in ms
  memoryGrowth: number;  // Memory growth limit in MB
  eventQueue: number;    // Maximum pending events
}

export interface DashboardMetrics {
  components: Map<string, ComponentMetrics>;
  events: EventMetric[];
  renders: number[];
  memory: MemoryMetrics;
  thresholds: PerformanceThresholds;
}

export interface MemoryStatus {
  status: 'OK' | 'WATCH' | 'HIGH';
  className: string;
  message?: string;
}

export interface BenchmarkOptions {
  componentCount?: number;
  renderCount?: number;
  eventCount?: number;
}

export interface DashboardConfig {
  visible?: boolean;
  updateInterval?: number;
  maxRenderHistory?: number;
  maxEventHistory?: number;
  thresholds?: Partial<PerformanceThresholds>;
}
