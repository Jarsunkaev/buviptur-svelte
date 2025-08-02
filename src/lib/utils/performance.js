// Performance monitoring utility
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals() {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    }

    // First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          console.log('FID:', this.metrics.fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }

    // Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            console.log('CLS:', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }
  }

  // Monitor image loading performance
  monitorImageLoading() {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            console.log('All images loaded');
          }
        });
        img.addEventListener('error', () => {
          console.warn('Image failed to load:', img.src);
        });
      }
    });
  }

  // Monitor scroll performance
  monitorScrollPerformance() {
    if (typeof window === 'undefined') return;

    let scrollEvents = 0;
    let lastScrollTime = 0;

    const handleScroll = () => {
      scrollEvents++;
      const now = performance.now();
      const timeSinceLastScroll = now - lastScrollTime;
      
      if (timeSinceLastScroll < 16) { // Less than 60fps
        console.warn('Scroll performance issue detected');
      }
      
      lastScrollTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Log scroll performance every 10 seconds
    setInterval(() => {
      if (scrollEvents > 100) {
        console.warn('High scroll event count:', scrollEvents);
      }
      scrollEvents = 0;
    }, 10000);
  }

  // Monitor memory usage
  monitorMemoryUsage() {
    if (typeof window === 'undefined' || !performance.memory) return;

    setInterval(() => {
      const memory = performance.memory;
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      
      if (usedMB > 100) { // Warning if using more than 100MB
        console.warn('High memory usage:', usedMB, 'MB');
      }
      
      this.metrics.memory = {
        used: usedMB,
        total: totalMB
      };
    }, 5000);
  }

  // Get performance metrics
  getMetrics() {
    return this.metrics;
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    this.observers = [];
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return null;

  const monitor = new PerformanceMonitor();
  
  // Only monitor in development or when explicitly enabled
  if (import.meta.env.DEV || window.location.search.includes('debug=performance')) {
    monitor.monitorCoreWebVitals();
    monitor.monitorImageLoading();
    monitor.monitorScrollPerformance();
    monitor.monitorMemoryUsage();
    
    // Expose monitor to window for debugging
    window.performanceMonitor = monitor;
  }

  return monitor;
} 