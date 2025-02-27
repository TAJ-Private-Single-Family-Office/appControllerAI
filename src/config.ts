export const config = {
  wellsFargo: {
    apiUrl: process.env.WELLS_FARGO_API_URL || 'https://api.wellsfargo.com/v1',
    apiKey: process.env.WELLS_FARGO_API_KEY,
    timeout: 30000,
    retryAttempts: 3
  }
  // ...other config options...
};
