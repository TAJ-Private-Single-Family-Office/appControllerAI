import WebSocket from 'ws';
import { EventEmitter } from 'events';

export class WebSocketService extends EventEmitter {
    private wss: WebSocket.Server;
    private clients: Map<string, WebSocket> = new Map();

    constructor(port: number = 8080) {
        super();
        this.wss = new WebSocket.Server({ port });
        this.setupWebSocket();
    }

    private setupWebSocket(): void {
        this.wss.on('connection', (ws: WebSocket, req: any) => {
            const clientId = this.extractClientId(req);
            this.clients.set(clientId, ws);

            ws.on('message', (data: string) => {
                this.handleMessage(clientId, JSON.parse(data));
            });

            ws.on('close', () => {
                this.clients.delete(clientId);
            });
        });
    }

    private handleMessage(clientId: string, message: any): void {
        this.emit('message', { clientId, message });
    }

    public broadcast(event: string, data: any): void {
        const message = JSON.stringify({ event, data });
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    private extractClientId(req: any): string {
        // Extract client ID from request headers or query
        return req.headers['x-client-id'] || 'anonymous';
    }
}
