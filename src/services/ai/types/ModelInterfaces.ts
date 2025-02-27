export interface BaseModel {
    metadata: ModelMetadata;
    version: string;
    id: string;
}

export interface ModelMetadata {
    createdAt: Date;
    version: string;
    author: string;
    lastUpdated?: Date;
    description?: string;
}

export interface FraudDetectionModel extends BaseModel {
    threshold: number;
    parameters: Record<string, number>;
    weights: number[];
}

export interface SentimentAnalysisModel extends BaseModel {
    vocabulary: string[];
    weights: number[];
    config: Record<string, any>;
}

export interface TransactionPredictionModel extends BaseModel {
    features: string[];
    modelParams: Record<string, any>;
    metadata: ModelMetadata;
}
