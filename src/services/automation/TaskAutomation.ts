import { CronJob } from 'cron';
import { WellsFargoAPIClient } from '../wellsFargo/WellsFargoAPIClient';

export class TaskAutomationService {
  private jobs: Map<string, CronJob> = new Map();

  constructor(private apiClient: WellsFargoAPIClient) {}

  scheduleTransfer(config: {
    from: string;
    to: string;
    amount: number;
    cronSchedule: string;
    name: string;
  }) {
    const job = new CronJob(config.cronSchedule, async () => {
      try {
        await this.apiClient.initiateTransfer(
          config.from,
          config.to,
          config.amount
        );
      } catch (error) {
        console.error(`Automated transfer failed: ${error}`);
      }
    });

    this.jobs.set(config.name, job);
    job.start();
  }

  cancelTask(name: string) {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      this.jobs.delete(name);
    }
  }

  listActiveTasks(): string[] {
    return Array.from(this.jobs.keys());
  }
}
