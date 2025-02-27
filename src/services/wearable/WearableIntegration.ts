interface WearableNotification {
  title: string;
  body: string;
  priority?: 'high' | 'normal' | 'low';
}

export class WearableIntegration {
  private readonly supportedPlatforms = ['watchos', 'wearos', 'tizen'];

  async sendNotification(notification: WearableNotification) {
    if ('ServiceWorkerRegistration' in window) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(notification.title, {
        body: notification.body,
        vibrate: [200, 100, 200],
        priority: notification.priority || 'normal'
      });
    }
  }

  async requestVoiceCommand(): Promise<string> {
    if ('SpeechRecognition' in window) {
      // Implement voice command logic
      return new Promise((resolve) => {
        // Add voice recognition implementation
      });
    }
    throw new Error('Voice recognition not supported');
  }

  isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }
}
