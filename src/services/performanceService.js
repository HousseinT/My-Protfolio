/**
 * Performance monitoring and optimization service
 * Provides utilities for measuring and improving application performance
 */

import { PERFORMANCE_THRESHOLDS, CACHE_CONFIG } from '../constants/index.js';
import { handleError, measurePerformance } from '../utils/index.js';

class PerformanceService {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isSupported = this.checkSupport();
    this.init();
  }

  /**
   * Check if performance APIs are supported
   */
  checkSupport() {
    return {
      performance: typeof performance !== 'undefined',
      observer: typeof PerformanceObserver !== 'undefined',
      intersectionObserver: typeof IntersectionObserver !== 'undefined',
      webVitals: typeof performance !== 'undefined' && 'getEntriesByType' in performance,
    };
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    if (!this.isSupported.performance) return;

    try {
      this.setupPerformanceObserver();
      this.measureInitialLoad();
      this.setupWebVitals();
    } catch (error) {
      handleError(error, 'PerformanceService.init');
    }
  }

  /**
   * Setup performance observer for various metrics
   */
  setupPerformanceObserver() {
    if (!this.isSupported.observer) return;

    try {
      // Navigation timing
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('navigation', {
            type: entry.entryType,
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
          });
        });
      });
      navObserver.observe({ entryTypes: ['navigation'] });
      this.observers.set('navigation', navObserver);

      // Resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('resource', {
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize || 0,
            type: this.getResourceType(entry.name),
          });
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', resourceObserver);

      // Measure timing
      const measureObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('measure', {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
          });
        });
      });
      measureObserver.observe({ entryTypes: ['measure'] });
      this.observers.set('measure', measureObserver);
    } catch (error) {
      handleError(error, 'PerformanceService.setupPerformanceObserver');
    }
  }

  /**
   * Measure initial page load metrics
   */
  measureInitialLoad() {
    if (!this.isSupported.performance) return;

    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint(),
        };

        this.recordMetric('initialLoad', metrics);
        this.checkPerformanceThresholds(metrics);
      }
    } catch (error) {
      handleError(error, 'PerformanceService.measureInitialLoad');
    }
  }

  /**
   * Setup Web Vitals monitoring
   */
  setupWebVitals() {
    if (!this.isSupported.webVitals) return;

    try {
      // Largest Contentful Paint (LCP)
      this.observeLCP();
      
      // First Input Delay (FID)
      this.observeFID();
      
      // Cumulative Layout Shift (CLS)
      this.observeCLS();
    } catch (error) {
      handleError(error, 'PerformanceService.setupWebVitals');
    }
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    if (!this.isSupported.observer) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.recordMetric('lcp', {
            value: lastEntry.startTime,
            element: lastEntry.element?.tagName || 'unknown',
            url: lastEntry.url || '',
          });
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', observer);
    } catch (error) {
      handleError(error, 'PerformanceService.observeLCP');
    }
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    if (!this.isSupported.observer) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordMetric('fid', {
            value: entry.processingStart - entry.startTime,
            name: entry.name,
            startTime: entry.startTime,
          });
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', observer);
    } catch (error) {
      handleError(error, 'PerformanceService.observeFID');
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    if (!this.isSupported.observer) return;

    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('cls', { value: clsValue });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', observer);
    } catch (error) {
      handleError(error, 'PerformanceService.observeCLS');
    }
  }

  /**
   * Get First Paint timing
   */
  getFirstPaint() {
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    } catch (error) {
      handleError(error, 'PerformanceService.getFirstPaint');
      return null;
    }
  }

  /**
   * Get First Contentful Paint timing
   */
  getFirstContentfulPaint() {
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? fcp.startTime : null;
    } catch (error) {
      handleError(error, 'PerformanceService.getFirstContentfulPaint');
      return null;
    }
  }

  /**
   * Get resource type from URL
   */
  getResourceType(url) {
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    }
    if (['css'].includes(extension)) {
      return 'stylesheet';
    }
    if (['js', 'mjs'].includes(extension)) {
      return 'script';
    }
    if (['woff', 'woff2', 'ttf', 'otf'].includes(extension)) {
      return 'font';
    }
    
    return 'other';
  }

  /**
   * Record a performance metric
   */
  recordMetric(type, data) {
    try {
      const timestamp = Date.now();
      const metric = {
        type,
        data,
        timestamp,
        id: `${type}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      };

      if (!this.metrics.has(type)) {
        this.metrics.set(type, []);
      }

      const typeMetrics = this.metrics.get(type);
      typeMetrics.push(metric);

      // Keep only recent metrics to prevent memory leaks
      const maxMetrics = 100;
      if (typeMetrics.length > maxMetrics) {
        typeMetrics.splice(0, typeMetrics.length - maxMetrics);
      }

      // Emit custom event for external listeners
      this.emitMetricEvent(metric);
    } catch (error) {
      handleError(error, 'PerformanceService.recordMetric');
    }
  }

  /**
   * Emit custom event for metric recording
   */
  emitMetricEvent(metric) {
    try {
      const event = new CustomEvent('performance-metric', {
        detail: metric,
      });
      window.dispatchEvent(event);
    } catch (error) {
      handleError(error, 'PerformanceService.emitMetricEvent');
    }
  }

  /**
   * Check if metrics exceed performance thresholds
   */
  checkPerformanceThresholds(metrics) {
    try {
      const warnings = [];

      if (metrics.domContentLoaded > PERFORMANCE_THRESHOLDS.DOM_CONTENT_LOADED) {
        warnings.push(`DOM Content Loaded took ${metrics.domContentLoaded}ms (threshold: ${PERFORMANCE_THRESHOLDS.DOM_CONTENT_LOADED}ms)`);
      }

      if (metrics.loadComplete > PERFORMANCE_THRESHOLDS.LOAD_COMPLETE) {
        warnings.push(`Load Complete took ${metrics.loadComplete}ms (threshold: ${PERFORMANCE_THRESHOLDS.LOAD_COMPLETE}ms)`);
      }

      if (metrics.firstContentfulPaint > PERFORMANCE_THRESHOLDS.FIRST_CONTENTFUL_PAINT) {
        warnings.push(`First Contentful Paint took ${metrics.firstContentfulPaint}ms (threshold: ${PERFORMANCE_THRESHOLDS.FIRST_CONTENTFUL_PAINT}ms)`);
      }

      if (warnings.length > 0) {
        console.warn('Performance thresholds exceeded:', warnings);
        this.recordMetric('threshold-warning', { warnings });
      }
    } catch (error) {
      handleError(error, 'PerformanceService.checkPerformanceThresholds');
    }
  }

  /**
   * Get metrics by type
   */
  getMetrics(type) {
    return this.metrics.get(type) || [];
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    const allMetrics = {};
    for (const [type, metrics] of this.metrics.entries()) {
      allMetrics[type] = metrics;
    }
    return allMetrics;
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    try {
      const summary = {
        totalMetrics: 0,
        types: {},
        averages: {},
        latest: {},
      };

      for (const [type, metrics] of this.metrics.entries()) {
        summary.totalMetrics += metrics.length;
        summary.types[type] = metrics.length;
        
        if (metrics.length > 0) {
          summary.latest[type] = metrics[metrics.length - 1];
          
          // Calculate averages for numeric values
          if (type === 'initialLoad') {
            const values = metrics.map(m => m.data);
            summary.averages[type] = {
              domContentLoaded: this.calculateAverage(values.map(v => v.domContentLoaded)),
              loadComplete: this.calculateAverage(values.map(v => v.loadComplete)),
              firstPaint: this.calculateAverage(values.map(v => v.firstPaint).filter(v => v !== null)),
              firstContentfulPaint: this.calculateAverage(values.map(v => v.firstContentfulPaint).filter(v => v !== null)),
            };
          }
        }
      }

      return summary;
    } catch (error) {
      handleError(error, 'PerformanceService.getPerformanceSummary');
      return null;
    }
  }

  /**
   * Calculate average of numeric array
   */
  calculateAverage(values) {
    if (!values.length) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Mark a custom timing point
   */
  mark(name) {
    try {
      if (this.isSupported.performance) {
        performance.mark(name);
      }
    } catch (error) {
      handleError(error, 'PerformanceService.mark');
    }
  }

  /**
   * Measure time between two marks
   */
  measure(name, startMark, endMark) {
    try {
      if (this.isSupported.performance) {
        performance.measure(name, startMark, endMark);
      }
    } catch (error) {
      handleError(error, 'PerformanceService.measure');
    }
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear();
  }

  /**
   * Cleanup observers and metrics
   */
  cleanup() {
    try {
      // Disconnect all observers
      for (const [name, observer] of this.observers.entries()) {
        observer.disconnect();
      }
      this.observers.clear();
      
      // Clear metrics
      this.clearMetrics();
    } catch (error) {
      handleError(error, 'PerformanceService.cleanup');
    }
  }
}

// Create singleton instance
const performanceService = new PerformanceService();

export default performanceService;

// Export individual methods for convenience
export const {
  recordMetric,
  getMetrics,
  getAllMetrics,
  getPerformanceSummary,
  mark,
  measure,
  clearMetrics,
  cleanup,
} = performanceService;