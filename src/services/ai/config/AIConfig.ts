export class AIConfig {
    private static instance: AIConfig;
    private config: Record<string, any>;

    private constructor() {
        this.config = {
            cacheTimeout: 3600,
            checkPeriod: 120,
            maxModelSize: 1024 * 1024 * 100, // 100MB
            preloadModels: true,
            logLevel: 'info',
            modelBasePath: '/models',
            retryAttempts: 3,
            retryDelay: 1000
        };
    }

    static getInstance(): AIConfig {
        if (!AIConfig.instance) {
            AIConfig.instance = new AIConfig();
        }
        return AIConfig.instance;
    }

    get<T>(key: string): T {
        if (!(key in this.config)) {
            throw new Error(`Configuration key not found: ${key}`);
        }
        return this.config[key] as T;
    }

    set<T>(key: string, value: T): void {
        this.config[key] = value;
    }
}
