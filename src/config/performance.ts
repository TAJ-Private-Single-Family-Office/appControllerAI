export const performanceConfig = {
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes
    maxSize: 100 // Maximum items in cache
  },
  requests: {
    timeout: 30000, // 30 seconds
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  memory: {
    checkInterval: 30000, // 30 seconds
    threshold: 0.9 // 90% of max memory
  }
};
