import NodeCache from 'node-cache';

describe('Cache', () => {
  let cache: NodeCache;

  beforeEach(() => {
    cache = new NodeCache({ stdTTL: 100 });
  });

  afterEach(() => {
    cache.flushAll();
  });

  test('should store and retrieve values', () => {
    cache.set('test-key', 'test-value');
    expect(cache.get('test-key')).toBe('test-value');
  });

  test('should handle expired cache items', async () => {
    cache = new NodeCache({ stdTTL: 0.1 }); // 100ms TTL
    cache.set('expiring-key', 'expiring-value');
    
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(cache.get('expiring-key')).toBeUndefined();
  });
});
