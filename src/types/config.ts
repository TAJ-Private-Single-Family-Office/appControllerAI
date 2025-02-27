import { AIAgentConfig } from './ai';

export interface ConfigOptions {
    wellsFargo: {
        apiEndpoint: string;
        clientId: string;
        clientSecret: string;
    };
    azure: {
        tenantId: string;
        cognitiveServicesKey: string;
        keyVaultUrl: string;
        aiAgent: AIAgentConfig;
        monitoring: {
            appInsightsConnString: string;
        };
    };
    security: {
        encryptionKey: string;
        jwtSecret: string;
        mfaEnabled: boolean;
    };
    services: {
        plaid: {
            clientId: string;
            secret: string;
        };
    };
    blockchain: {
        rpcUrl: string;
        contractAddress: string;
        abi: any[];
    };
}
