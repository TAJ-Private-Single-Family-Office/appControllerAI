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
    metadata?: Record<string, any>;
}

export interface AIAgentRequest {
    query: string;
    context?: Record<string, any>;
    sessionId?: string;
}
