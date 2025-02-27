import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { config } from '../config/config';

export class LoggingService {
    private appInsights: ApplicationInsights;
    private static instance: LoggingService;

    private constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                connectionString: config.azure.appInsightsConnString,
                enableAutoRouteTracking: true,
                enableRequestTrackingTelemetry: true
            }
        });
        this.appInsights.loadAppInsights();
    }

    static getInstance(): LoggingService {
        if (!LoggingService.instance) {
            LoggingService.instance = new LoggingService();
        }
        return LoggingService.instance;
    }

    logError(error: Error, context?: Record<string, any>): void {
        console.error({
            timestamp: new Date().toISOString(),
            error: {
                message: error.message,
                stack: error.stack,
            },
            context,
        });
    }

    logInfo(message: string, data?: Record<string, any>): void {
        console.log({
            timestamp: new Date().toISOString(),
            message,
            data,
        });
    }

    logWarning(message: string, data?: Record<string, any>): void {
        console.warn({
            timestamp: new Date().toISOString(),
            message,
            data,
        });
    }
}
