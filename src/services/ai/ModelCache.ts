import NodeCache from 'node-cache';
import { ModelType } from './ModelVersioning';
import { Logger } from './Logger';
import { AIConfig } from './config/AIConfig';
import { BaseModel } from './types/ModelInterfaces';

interface CacheStats {
    hits: number;
    misses: number;
    lastAccessed: Date;
}

export class ModelCache {
    private static instance: ModelCache;
    private cache: NodeCache;
    private stats: Map<string, CacheStats>;
    private logger: Logger;
    private config: AIConfig;

    private constructor() {
        this.config = AIConfig.getInstance();
        this.cache = new NodeCache({
            stdTTL: this.config.get<number>('cacheTimeout'),
            checkperiod: this.config.get<number>('checkPeriod'),
            useClones: false
        });
        this.stats = new Map();
        this.logger = Logger.getInstance();
        this.setupMonitoring();
    }

    static getInstance(): ModelCache {
        if (!ModelCache.instance) {
            ModelCache.instance = new ModelCache();
        }
        return ModelCache.instance;
    }

    async getModel(modelId: string): Promise<BaseModel> {
        const model = this.cache.get<BaseModel>(modelId);
        this.updateStats(modelId, !!model);
        this.logger.logModelAccess(modelId, !!model);
        
        if (!model) {
            throw new Error(`Model not found in cache: ${modelId}`);
        }
        return model;
    }

    async setModel(modelId: string, model: any): Promise<void> {
        if (!this.validateModel(model)) {
            throw new Error('Invalid model format');
        }
        this.cache.set(modelId, model);
    }

    async invalidateModel(modelId: string): Promise<void> {
        this.cache.del(modelId);
    }

    getCacheStats(modelId: string): CacheStats | undefined {
        return this.stats.get(modelId);
    }

    private validateModel(model: any): boolean {
        return model && typeof model === 'object';
    }

    private updateStats(modelId: string, isHit: boolean): void {
        const currentStats = this.stats.get(modelId) || { hits: 0, misses: 0, lastAccessed: new Date() };
        if (isHit) {
            currentStats.hits++;
        } else {
            currentStats.misses++;
        }
        currentStats.lastAccessed = new Date();
        this.stats.set(modelId, currentStats);
    }

    private setupMonitoring(): void {
        this.cache.on('expired', (key: string) => {
            console.log(`Cache entry expired: ${key}`);
        });
    }
}
