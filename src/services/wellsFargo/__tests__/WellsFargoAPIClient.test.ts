import { WellsFargoAPIClient } from '../WellsFargoAPIClient';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WellsFargoAPIClient', () => {
  let client: WellsFargoAPIClient;

  beforeEach(() => {
    client = new WellsFargoAPIClient({
      apiKey: 'test-key',
      apiSecret: 'test-secret',
      baseURL: 'https://api.wellsfargo.test',
    });
  });

  test('getAccountInfo makes correct API call', async () => {
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: { accountId: '123' } })
    } as any);

    await client.getAccountInfo('123');
    
    expect(mockedAxios.create).toHaveBeenCalled();
  });

  test('initiateTransfer makes correct API call', async () => {
    mockedAxios.create.mockReturnValue({
      post: jest.fn().mockResolvedValue({ data: { transferId: '123' } })
    } as any);

    await client.initiateTransfer('source', 'dest', 100);
    
    expect(mockedAxios.create).toHaveBeenCalled();
  });
});
