import { EventEmitter } from 'events';

export class MemoryManager extends EventEmitter {
  private static instance: MemoryManager;
  private memoryThreshold = 0.9; // 90% of max memory

  private constructor() {
    super();
    this.monitorMemory();
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  private monitorMemory(): void {
    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      const heapUsed = memoryUsage.heapUsed / memoryUsage.heapTotal;

      if (heapUsed > this.memoryThreshold) {
        this.emit('memory-critical', {
          heapUsed,
          timestamp: new Date()
        });
        global.gc?.();
      }
    }, 30000); // Check every 30 seconds
  }

  public getMemoryStats(): Record<string, number> {
    const { heapUsed, heapTotal, external } = process.memoryUsage();
    return {
      heapUsed,
      heapTotal,
      external,
      percentage: (heapUsed / heapTotal) * 100
    };
  }
}
