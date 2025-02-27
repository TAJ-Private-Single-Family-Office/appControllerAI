import axios from 'axios';
import { config } from '../config/config';
import { AIAgentRequest, AIAgentResponse, Suggestion } from '../types/ai';
import { LoggingService } from './LoggingService';
import { Logger } from './ai/Logger';

export class AIAgentService {
    private readonly logger = LoggingService.getInstance();
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;

    constructor() {
        const agentConfig = config.azure.aiAgent;
        this.baseUrl = `${agentConfig.endpoint}/api/v1`;
        this.headers = {
            'Content-Type': 'application/json',
            'Api-Key': agentConfig.apiKey,
            'x-ms-version': agentConfig.apiVersion
        };
    }

    async processQuery(request: AIAgentRequest): Promise<AIAgentResponse> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/query`,
                request,
                { headers: this.headers }
            );
            
            return {
                type: 'text',
                content: response.data.response,
                confidence: response.data.confidence,
                metadata: response.data.metadata
            };
        } catch (error) {
            return this.handleError(error, { request });
        }
    }

    async getSuggestions(context: Record<string, any>): Promise<AIAgentResponse[]> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/suggestions`,
                { context },
                { headers: this.headers }
            );
            
            return response.data.suggestions.map((suggestion: Suggestion) => ({
                type: 'suggestion',
                content: suggestion.text,
                confidence: suggestion.score,
                metadata: suggestion.metadata
            }));
        } catch (error) {
            return [this.handleError(error, { context })];
        }
    }

    private handleError(error: unknown, context: Record<string, unknown>) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        this.logger.logError(new Error(errorMessage), context);
        return {
            type: 'error' as const,
            content: errorMessage,
            metadata: { error: errorMessage }
        };
    }
}
