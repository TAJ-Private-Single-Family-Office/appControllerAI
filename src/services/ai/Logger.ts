export class Logger {
    private static instance: Logger;
    
    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    logModelOperation(operation: string, modelId: string, success: boolean, error?: Error): void {
        const timestamp = new Date().toISOString();
        const status = success ? 'SUCCESS' : 'FAILURE';
        const errorMsg = error ? ` - Error: ${error.message}` : '';
        console.log(`[${timestamp}] ${operation} - Model: ${modelId} - Status: ${status}${errorMsg}`);
    }

    logModelAccess(modelId: string, cacheHit: boolean): void {
        const timestamp = new Date().toISOString();
        const accessType = cacheHit ? 'CACHE_HIT' : 'CACHE_MISS';
        console.log(`[${timestamp}] Model Access - Model: ${modelId} - ${accessType}`);
    }
}
