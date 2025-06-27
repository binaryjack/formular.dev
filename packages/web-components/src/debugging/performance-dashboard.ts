/**
 * Performance Dashboard for Web Components Framework
 * Real-time monitoring of component performance, memory usage, and events
 * Built for TDD development workflow
 */

import type {
    BenchmarkOptions,
    ComponentMetrics,
    DashboardConfig,
    DashboardMetrics,
    EventMetric,
    MemoryMetrics,
    MemoryStatus,
    PerformanceThresholds
} from '../types/dashboard';

// Extend Performance interface for memory property
interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemory;
}

export class PerformanceDashboard {
  public metrics: DashboardMetrics;
  public isVisible: boolean;
  private readonly updateInterval: number;
  private readonly maxRenderHistory: number;
  private readonly maxEventHistory: number;
  private intervalId?: number;
  private dashboardElement?: HTMLElement;

  constructor(config: DashboardConfig = {}) {
    this.isVisible = config.visible ?? true;
    this.updateInterval = config.updateInterval ?? 1000;
    this.maxRenderHistory = config.maxRenderHistory ?? 100;
    this.maxEventHistory = config.maxEventHistory ?? 50;

    // Initialize metrics with default thresholds
    this.metrics = {
      components: new Map<string, ComponentMetrics>(),
      events: [] as EventMetric[],
      renders: [] as number[],
      memory: {
        usage: 0,
        peak: 0,
        limit: 50
      } as MemoryMetrics,
      thresholds: {
        renderTime: 16,     // 60fps = 16.67ms per frame
        memoryGrowth: 50,   // 50MB growth limit
        eventQueue: 100     // Max 100 pending events
      } as PerformanceThresholds
    };

    // Override thresholds if provided
    if (config.thresholds) {
      this.metrics.thresholds = { ...this.metrics.thresholds, ...config.thresholds };
    }

    this.initialize();
  }

  private initialize(): void {
    this.createDashboard();
    this.startMonitoring();
    
    // Make dashboard globally accessible for browser debugging
    if (typeof window !== 'undefined') {
      (window as any).dashboard = this;
    }
  }

  private createDashboard(): void {
    if (typeof document === 'undefined') return;

    // Create dashboard container
    this.dashboardElement = document.createElement('div');
    this.dashboardElement.id = 'performance-dashboard';
    this.dashboardElement.innerHTML = this.getDashboardHTML();
    
    // Add styles
    this.addDashboardStyles();
    
    // Append to body
    document.body.appendChild(this.dashboardElement);
    
    // Add event listeners
    this.attachEventListeners();
  }

  private getDashboardHTML(): string {
    return `
      <div class="dashboard-header">
        <h3>🔧 Web Components Performance Dashboard</h3>
        <div class="dashboard-controls">
          <button id="dashboard-toggle" class="btn btn-primary">Hide</button>
          <button id="dashboard-clear" class="btn btn-secondary">Clear</button>
          <button id="dashboard-benchmark" class="btn btn-success">Benchmark</button>
          <button id="dashboard-export" class="btn btn-info">Export</button>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="metrics-grid">
          <!-- Component Metrics -->
          <div class="metric-card">
            <h4>📦 Components</h4>
            <div class="metric-value" id="component-count">0</div>
            <div class="metric-label">Active Components</div>
          </div>
          
          <!-- Render Performance -->
          <div class="metric-card">
            <h4>⚡ Render Performance</h4>
            <div class="metric-value" id="avg-render-time">0ms</div>
            <div class="metric-label">Average Render Time</div>
            <div class="metric-status" id="render-status">OK</div>
          </div>
          
          <!-- Memory Usage -->
          <div class="metric-card">
            <h4>🧠 Memory</h4>
            <div class="metric-value" id="memory-usage">0MB</div>
            <div class="metric-label">Current / Peak</div>
            <div class="metric-status" id="memory-status">OK</div>
          </div>
          
          <!-- Event Activity -->
          <div class="metric-card">
            <h4>📡 Events</h4>
            <div class="metric-value" id="event-count">0</div>
            <div class="metric-label">Total Events</div>
          </div>
        </div>
        
        <!-- Live Activity Feed -->
        <div class="activity-section">
          <h4>📊 Live Activity</h4>
          <div id="activity-feed" class="activity-feed"></div>
        </div>
        
        <!-- Component Tree -->
        <div class="components-section">
          <h4>🌳 Component Tree</h4>
          <div id="component-tree" class="component-tree"></div>
        </div>
      </div>
    `;
  }

  private addDashboardStyles(): void {
    if (typeof document === 'undefined') return;

    const styleId = 'dashboard-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #performance-dashboard {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 400px;
        max-height: 80vh;
        background: #1e1e1e;
        color: #fff;
        border: 2px solid #333;
        border-radius: 8px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
        z-index: 10000;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      
      .dashboard-header {
        background: #2d2d2d;
        padding: 12px 16px;
        border-bottom: 1px solid #444;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .dashboard-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
      }
      
      .dashboard-controls {
        display: flex;
        gap: 6px;
      }
      
      .btn {
        padding: 4px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
        font-weight: 500;
      }
      
      .btn-primary { background: #007acc; color: white; }
      .btn-secondary { background: #666; color: white; }
      .btn-success { background: #28a745; color: white; }
      .btn-info { background: #17a2b8; color: white; }
      
      .btn:hover { opacity: 0.8; }
      
      .dashboard-content {
        padding: 16px;
      }
      
      .metrics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 16px;
      }
      
      .metric-card {
        background: #2a2a2a;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #444;
      }
      
      .metric-card h4 {
        margin: 0 0 8px 0;
        font-size: 11px;
        color: #ccc;
      }
      
      .metric-value {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 4px;
      }
      
      .metric-label {
        font-size: 9px;
        color: #888;
      }
      
      .metric-status {
        font-size: 10px;
        font-weight: bold;
        margin-top: 4px;
        padding: 2px 6px;
        border-radius: 3px;
      }
      
      .status-ok { background: #28a745; color: white; }
      .status-warning { background: #ffc107; color: black; }
      .status-error { background: #dc3545; color: white; }
      
      .activity-section, .components-section {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #444;
      }
      
      .activity-section h4, .components-section h4 {
        margin: 0 0 8px 0;
        font-size: 12px;
        color: #ccc;
      }
      
      .activity-feed {
        max-height: 120px;
        overflow-y: auto;
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 8px;
      }
      
      .activity-item {
        font-size: 10px;
        padding: 2px 0;
        border-bottom: 1px solid #333;
        color: #ccc;
      }
      
      .activity-item:last-child {
        border-bottom: none;
      }
      
      .component-tree {
        max-height: 100px;
        overflow-y: auto;
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 8px;
      }
      
      .component-item {
        font-size: 10px;
        padding: 2px 0;
        color: #ccc;
        display: flex;
        justify-content: space-between;
      }
      
      .component-stats {
        color: #888;
      }
      
      .dashboard-hidden {
        transform: translateX(calc(100% - 60px));
        transition: transform 0.3s ease;
      }
    `;
    
    document.head.appendChild(style);
  }

  private attachEventListeners(): void {
    if (!this.dashboardElement) return;

    const toggleBtn = this.dashboardElement.querySelector('#dashboard-toggle') as HTMLButtonElement;
    const clearBtn = this.dashboardElement.querySelector('#dashboard-clear') as HTMLButtonElement;
    const benchmarkBtn = this.dashboardElement.querySelector('#dashboard-benchmark') as HTMLButtonElement;
    const exportBtn = this.dashboardElement.querySelector('#dashboard-export') as HTMLButtonElement;

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearMetrics());
    }
    
    if (benchmarkBtn) {
      benchmarkBtn.addEventListener('click', () => this.runBenchmark());
    }
    
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportMetrics());
    }
  }

  private startMonitoring(): void {
    if (typeof setInterval === 'undefined') return;

    this.intervalId = setInterval(() => {
      this.updateMemoryMetrics();
      this.updateDisplay();
    }, this.updateInterval) as unknown as number;
  }

  // Public API Methods

  public trackComponent(componentId: string, metadata: Record<string, any> = {}): void {
    const component: ComponentMetrics = {
      id: componentId,
      type: metadata.type ?? 'unknown',
      renders: 0,
      events: 0,
      createdAt: performance.now(),
      metadata
    };

    this.metrics.components.set(componentId, component);
    this.logActivity(`📦 Component registered: ${componentId}`);
  }

  public trackRender(componentId: string, renderTime: number): void {
    const component = this.metrics.components.get(componentId);
    if (component) {
      component.renders++;
      component.lastRender = renderTime;
    }

    // Track render history
    this.metrics.renders.push(renderTime);
    
    // Limit history size
    if (this.metrics.renders.length > this.maxRenderHistory) {
      this.metrics.renders = this.metrics.renders.slice(-this.maxRenderHistory);
    }

    this.logActivity(`⚡ Render: ${componentId} (${renderTime.toFixed(2)}ms)`);
  }

  public trackEvent(componentId: string, eventType: string, data: Record<string, any> = {}): void {
    const event: EventMetric = {
      componentId,
      eventType,
      timestamp: performance.now(),
      data
    };

    this.metrics.events.push(event);
    
    // Update component event count
    const component = this.metrics.components.get(componentId);
    if (component) {
      component.events++;
    }

    // Limit event history size
    if (this.metrics.events.length > this.maxEventHistory) {
      this.metrics.events = this.metrics.events.slice(-this.maxEventHistory);
    }

    this.logActivity(`📡 Event: ${eventType} on ${componentId}`);
  }

  public updateMemoryMetrics(): void {
    const perf = performance as PerformanceWithMemory;
    if (typeof performance === 'undefined' || !perf.memory) return;

    const currentUsage = Math.round(perf.memory.usedJSHeapSize / (1024 * 1024));
    this.metrics.memory.usage = currentUsage;
    
    if (currentUsage > this.metrics.memory.peak) {
      this.metrics.memory.peak = currentUsage;
    }
  }

  public getMemoryStatus(): MemoryStatus {
    const usage = this.metrics.memory.usage;
    const threshold = this.metrics.thresholds.memoryGrowth;

    if (usage > threshold) {
      return { status: 'HIGH', className: 'status-error' };
    } else if (usage > threshold * 0.8) {
      return { status: 'WATCH', className: 'status-warning' };
    } else {
      return { status: 'OK', className: 'status-ok' };
    }
  }

  public clearMetrics(): void {
    this.metrics.components.clear();
    this.metrics.events = [];
    this.metrics.renders = [];
    this.metrics.memory.peak = this.metrics.memory.usage;
    
    this.logActivity('🧹 Metrics cleared');
    this.updateDisplay();
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
    
    if (this.dashboardElement) {
      if (this.isVisible) {
        this.dashboardElement.classList.remove('dashboard-hidden');
      } else {
        this.dashboardElement.classList.add('dashboard-hidden');
      }
    }

    // Update toggle button text
    const toggleBtn = this.dashboardElement?.querySelector('#dashboard-toggle') as HTMLButtonElement;
    if (toggleBtn) {
      toggleBtn.textContent = this.isVisible ? 'Hide' : 'Show';
    }
  }

  public runBenchmark(options: BenchmarkOptions = {}): void {
    const {
      componentCount = 100,
      renderCount = 100,
      eventCount = 200
    } = options;

    console.log('🏁 Starting benchmark...');
    
    const startTime = performance.now();

    // Create test components
    for (let i = 0; i < componentCount; i++) {
      this.trackComponent(`benchmark-component-${i}`, { 
        type: 'benchmark',
        index: i
      });
    }

    // Simulate renders
    for (let i = 0; i < renderCount; i++) {
      const componentId = `benchmark-component-${i % componentCount}`;
      const renderTime = Math.random() * 20; // 0-20ms
      this.trackRender(componentId, renderTime);
    }

    // Simulate events
    for (let i = 0; i < eventCount; i++) {
      const componentId = `benchmark-component-${i % componentCount}`;
      this.trackEvent(componentId, `event-${i % 10}`, { index: i });
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`✅ Benchmark completed in ${duration.toFixed(2)}ms`);
    this.logActivity(`🏁 Benchmark: ${componentCount} components, ${renderCount} renders, ${eventCount} events`);
  }

  public exportMetrics(): void {
    const exportData = {
      timestamp: new Date().toISOString(),
      metrics: {
        componentCount: this.metrics.components.size,
        totalEvents: this.metrics.events.length,
        totalRenders: this.metrics.renders.length,
        averageRenderTime: this.getAverageRenderTime(),
        memoryUsage: this.metrics.memory.usage,
        peakMemory: this.metrics.memory.peak,
        components: Array.from(this.metrics.components.values()),
        recentEvents: this.metrics.events.slice(-20),
        recentRenders: this.metrics.renders.slice(-20)
      }
    };

    // Create downloadable file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-metrics-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    this.logActivity('📊 Metrics exported');
  }

  public destroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    if (this.dashboardElement) {
      this.dashboardElement.remove();
    }
    
    // Remove global reference
    if (typeof window !== 'undefined') {
      delete (window as any).dashboard;
    }
  }

  // Private helper methods

  private updateDisplay(): void {
    if (!this.dashboardElement) return;

    this.updateComponentCount();
    this.updateRenderMetrics();
    this.updateMemoryDisplay();
    this.updateEventCount();
    this.updateComponentTree();
  }

  private updateComponentCount(): void {
    const element = this.dashboardElement?.querySelector('#component-count');
    if (element) {
      element.textContent = this.metrics.components.size.toString();
    }
  }

  private updateRenderMetrics(): void {
    const timeElement = this.dashboardElement?.querySelector('#avg-render-time');
    const statusElement = this.dashboardElement?.querySelector('#render-status');
    
    if (timeElement) {
      const avgTime = this.getAverageRenderTime();
      timeElement.textContent = `${avgTime.toFixed(1)}ms`;
    }
    
    if (statusElement) {
      const avgTime = this.getAverageRenderTime();
      const threshold = this.metrics.thresholds.renderTime;
      
      if (avgTime > threshold) {
        statusElement.textContent = 'SLOW';
        statusElement.className = 'metric-status status-error';
      } else if (avgTime > threshold * 0.8) {
        statusElement.textContent = 'WATCH';
        statusElement.className = 'metric-status status-warning';
      } else {
        statusElement.textContent = 'OK';
        statusElement.className = 'metric-status status-ok';
      }
    }
  }

  private updateMemoryDisplay(): void {
    const usageElement = this.dashboardElement?.querySelector('#memory-usage');
    const statusElement = this.dashboardElement?.querySelector('#memory-status');
    
    if (usageElement) {
      const { usage, peak } = this.metrics.memory;
      usageElement.textContent = `${usage}MB / ${peak}MB`;
    }
    
    if (statusElement) {
      const status = this.getMemoryStatus();
      statusElement.textContent = status.status;
      statusElement.className = `metric-status ${status.className}`;
    }
  }

  private updateEventCount(): void {
    const element = this.dashboardElement?.querySelector('#event-count');
    if (element) {
      element.textContent = this.metrics.events.length.toString();
    }
  }

  private updateComponentTree(): void {
    const treeElement = this.dashboardElement?.querySelector('#component-tree');
    if (!treeElement) return;

    const components = Array.from(this.metrics.components.values())
      .sort((a, b) => b.renders - a.renders)
      .slice(0, 10); // Show top 10 most active

    treeElement.innerHTML = components
      .map(component => `
        <div class="component-item">
          <span>${component.id}</span>
          <span class="component-stats">${component.renders}r ${component.events}e</span>
        </div>
      `)
      .join('');
  }

  private getAverageRenderTime(): number {
    if (this.metrics.renders.length === 0) return 0;
    
    const sum = this.metrics.renders.reduce((acc, time) => acc + time, 0);
    return sum / this.metrics.renders.length;
  }

  private logActivity(message: string): void {
    const feedElement = this.dashboardElement?.querySelector('#activity-feed');
    if (!feedElement) return;

    const timestamp = new Date().toLocaleTimeString();
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.textContent = `${timestamp} - ${message}`;
    
    feedElement.insertBefore(activityItem, feedElement.firstChild);
    
    // Limit activity items
    const items = feedElement.querySelectorAll('.activity-item');
    if (items.length > 20) {
      items[items.length - 1].remove();
    }
  }
}
