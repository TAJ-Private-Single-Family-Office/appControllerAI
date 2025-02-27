/// <reference lib="dom" />

interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[] | undefined;
}

interface WearableEvent {
  type: string;
  data: any;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface WearableNotification {
  title: string;
  body: string;
  priority?: 'high' | 'normal' | 'low';
}

export class WearableIntegration {
  private readonly supportedPlatforms = ['watchos', 'wearos', 'tizen'];

  private isBrowser(): boolean {
    return typeof globalThis !== 'undefined' 
      && typeof globalThis.window !== 'undefined'
      && typeof globalThis.window.document !== 'undefined';
  }

  private hasServiceWorkerSupport(): boolean {
    return this.isBrowser() 
      && 'serviceWorker' in globalThis.navigator;
  }

  async sendNotification(notification: WearableNotification): Promise<void> {
    if (!this.hasServiceWorkerSupport()) {
      throw new Error('Service Worker not supported in this environment');
    }

    const registration = await globalThis.navigator.serviceWorker.ready;
    await registration.showNotification(notification.title, {
      body: notification.body,
      vibrate: [200, 100, 200],
      priority: notification.priority || 'normal'
    } as ExtendedNotificationOptions);
  }

  async requestVoiceCommand(): Promise<string> {
    if (!this.isBrowser() || !('SpeechRecognition' in globalThis.window)) {
      throw new Error('Voice recognition not supported');
    }

    return new Promise((resolve, reject) => {
      const SpeechRecognition = globalThis.window.SpeechRecognition 
        || globalThis.window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };
      
      recognition.start();
    });
  }

  isSupported(): boolean {
    return this.hasServiceWorkerSupport();
  }

  private handleWearableData(event: WearableEvent) {
    // Handle wearable data
  }

  private handleWearableError(event: Event) {
    // Handle wearable error
  }
}
