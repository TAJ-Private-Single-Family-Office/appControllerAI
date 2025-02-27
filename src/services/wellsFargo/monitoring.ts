import { Prometheus } from 'prom-client';

export class APIMonitoring {
  private requestCounter: Prometheus.Counter;
  private responseTimeHistogram: Prometheus.Histogram;
  private errorCounter: Prometheus.Counter;
  private rateLimit: Prometheus.Gauge;

  constructor() {
    this.requestCounter = new Prometheus.Counter({
      name: 'wells_fargo_api_requests_total',
      help: 'Total number of requests made to Wells Fargo API',
      labelNames: ['endpoint'],
    });

    this.responseTimeHistogram = new Prometheus.Histogram({
      name: 'wells_fargo_api_response_time',
      help: 'Response time of Wells Fargo API calls',
      labelNames: ['endpoint'],
    });

    this.errorCounter = new Prometheus.Counter({
      name: 'wells_fargo_api_errors_total',
      help: 'Total number of API errors',
      labelNames: ['type'],
    });

    this.rateLimit = new Prometheus.Gauge({
      name: 'wells_fargo_api_rate_limit',
      help: 'Current API rate limit remaining',
    });
  }

  trackRequest(endpoint: string) {
    this.requestCounter.inc({ endpoint });
  }

  trackResponseTime(endpoint: string, duration: number) {
    this.responseTimeHistogram.observe({ endpoint }, duration);
  }

  trackError(type: string) {
    this.errorCounter.inc({ type });
  }

  updateRateLimit(remaining: number) {
    this.rateLimit.set(remaining);
  }
}
