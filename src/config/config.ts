import { ConfigOptions } from '../types/config';
import { AIAgentConfig } from '../types/ai';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

export const config: ConfigOptions = {
  wellsFargo: {
    apiEndpoint: requireEnv('WF_API_ENDPOINT'),
    clientId: requireEnv('WF_CLIENT_ID'),
    clientSecret: requireEnv('WF_CLIENT_SECRET')
  },
  azure: {
    tenantId: requireEnv('AZURE_TENANT_ID'),
    cognitiveServicesKey: requireEnv('AZURE_COG_KEY'),
    keyVaultUrl: requireEnv('AZURE_KEYVAULT_URL'),
    aiAgent: {
      resourceId: requireEnv('AZURE_AI_AGENT_RESOURCE_ID'),
      endpoint: requireEnv('AZURE_AI_AGENT_ENDPOINT'),
      apiVersion: '2023-05-01',
      apiKey: requireEnv('AZURE_AI_AGENT_KEY')
    },
    monitoring: {
      appInsightsConnString: requireEnv('AZURE_APPINSIGHTS_CONNECTION_STRING')
    }
  },
  security: {
    encryptionKey: requireEnv('ENCRYPTION_KEY'),
    jwtSecret: requireEnv('JWT_SECRET'),
    mfaEnabled: process.env.MFA_ENABLED === 'true'
  },
  services: {
    plaid: {
      clientId: requireEnv('PLAID_CLIENT_ID'),
      secret: requireEnv('PLAID_SECRET')
    }
  },
  blockchain: {
    rpcUrl: requireEnv('BLOCKCHAIN_RPC_URL'),
    contractAddress: requireEnv('BLOCKCHAIN_CONTRACT_ADDRESS'),
    abi: JSON.parse(requireEnv('BLOCKCHAIN_CONTRACT_ABI'))
  }
};
