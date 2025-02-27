jest.setTimeout(10000); // Set global timeout to 10s

// Mock crypto for consistent testing
const crypto = require('crypto');

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn((size) => Buffer.alloc(size))
}));

beforeAll(() => {
  // Add any global setup here
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  // Add any global teardown here
});
