import WebSocket from 'ws';
import { EventEmitter } from 'events';

export class BankingWebSocketService {
  private ws!: WebSocket; // Use definite assignment assertion
  private events: EventEmitter;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor(private url: string) {
    this.events = new EventEmitter();
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    this.ws = new WebSocket(this.url);
    
    this.ws.on('open', () => {
      this.reconnectAttempts = 0;
      this.events.emit('connected');
    });

    this.ws.on('message', (data: string) => {
      try {
        const parsed = JSON.parse(data);
        this.events.emit('update', parsed);
      } catch (error) {
        this.events.emit('error', error);
      }
    });

    this.ws.on('close', () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.initializeWebSocket();
        }, 1000 * Math.pow(2, this.reconnectAttempts));
      }
    });
  }

  subscribe(channel: string) {
    this.ws.send(JSON.stringify({ action: 'subscribe', channel }));
  }

  unsubscribe(channel: string) {
    this.ws.send(JSON.stringify({ action: 'unsubscribe', channel }));
  }

  onUpdate(callback: (data: any) => void) {
    this.events.on('update', callback);
  }

  close() {
    this.ws.close();
  }
}
