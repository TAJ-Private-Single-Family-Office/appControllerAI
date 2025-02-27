export interface AIAgentConfig {
    resourceId: string;
    endpoint: string;
    apiVersion: string;
    apiKey: string;
}

export interface AIAgentResponse {
    type: 'text' | 'suggestion' | 'error';
    content: string;
    confidence?: number;
    metadata?: Record<string, unknown>;
}

export interface AIAgentRequest {
    query: string;
    context?: Record<string, unknown>;
    sessionId?: string;
}

export interface Suggestion {
    text: string;
    score: number;
    metadata?: Record<string, unknown>;
}
