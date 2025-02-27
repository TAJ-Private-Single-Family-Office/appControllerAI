import WebSocket from 'ws';
import { NotificationType } from '../types/notifications';

export class NotificationService {
    private wss: WebSocket.Server;
    private clients: Map<string, WebSocket>;

    constructor() {
        this.wss = new WebSocket.Server({ port: 8080 });
        this.clients = new Map();
        this.initializeWebSocket();
    }

    private initializeWebSocket(): void {
        this.wss.on('connection', (ws: WebSocket, req: any) => {
            const userId = this.getUserIdFromRequest(req);
            this.clients.set(userId, ws);

            ws.on('close', () => {
                this.clients.delete(userId);
            });
        });
    }

    async sendNotification(userId: string, type: NotificationType, data: any): Promise<void> {
        const client = this.clients.get(userId);
        if (client) {
            client.send(JSON.stringify({ type, data }));
        }
    }

    async broadcastAlert(type: NotificationType, data: any): Promise<void> {
        this.clients.forEach(client => {
            client.send(JSON.stringify({ type, data }));
        });
    }

    private getUserIdFromRequest(req: any): string {
        // Extract user ID from request
        return 'user-id';
    }
}
