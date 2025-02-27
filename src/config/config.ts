import { ConfigOptions } from '../types/config';

export const config: ConfigOptions = {
    wellsFargo: {
        apiEndpoint: process.env.WF_API_ENDPOINT,
        clientId: process.env.WF_CLIENT_ID,
        clientSecret: process.env.WF_CLIENT_SECRET
    },
    azure: {
        tenantId: process.env.AZURE_TENANT_ID,
        cognitiveServicesKey: process.env.AZURE_COG_KEY,
        keyVaultUrl: process.env.AZURE_KEYVAULT_URL,
        aiAgent: {
            resourceId: process.env.AZURE_AI_AGENT_RESOURCE_ID,
            endpoint: process.env.AZURE_AI_AGENT_ENDPOINT,
            apiVersion: '2023-05-01',
            apiKey: process.env.AZURE_AI_AGENT_KEY
        }
    },
    security: {
        encryptionKey: process.env.ENCRYPTION_KEY,
        jwtSecret: process.env.JWT_SECRET,
        mfaEnabled: true
    },
    services: {
        plaid: {
            clientId: process.env.PLAID_CLIENT_ID,
            secret: process.env.PLAID_SECRET
        }
    }
};
