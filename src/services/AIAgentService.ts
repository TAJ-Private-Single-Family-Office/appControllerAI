import axios from 'axios';
import { config } from '../config/config';
import { AIAgentRequest, AIAgentResponse } from '../types/ai';
import { LoggingService } from './LoggingService';

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
            this.logger.logError(error, { request });
            return {
                type: 'error',
                content: 'Failed to process AI agent query',
                metadata: { error: error.message }
            };
        }
    }

    async getSuggestions(context: Record<string, any>): Promise<AIAgentResponse[]> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/suggestions`,
                { context },
                { headers: this.headers }
            );
            
            return response.data.suggestions.map(s => ({
                type: 'suggestion',
                content: s.text,
                confidence: s.score,
                metadata: s.metadata
            }));
        } catch (error) {
            this.logger.logError(error, { context });
            return [{
                type: 'error',
                content: 'Failed to get suggestions',
                metadata: { error: error.message }
            }];
        }
    }
}
