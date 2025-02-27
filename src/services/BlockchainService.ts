import { ethers } from 'ethers';
import { config } from '../config/config';

export class BlockchainService {
    private provider: ethers.providers.Provider;
    private contract: ethers.Contract;

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(config.blockchain.rpcUrl);
        this.contract = new ethers.Contract(
            config.blockchain.contractAddress,
            config.blockchain.abi,
            this.provider
        );
    }

    async recordTransaction(txHash: string, metadata: any): Promise<string> {
        const hash = await this.contract.recordTransaction(txHash, JSON.stringify(metadata));
        return hash;
    }

    async verifyTransaction(txHash: string): Promise<boolean> {
        const record = await this.contract.getTransaction(txHash);
        return record.verified;
    }

    async getTransactionHistory(accountId: string): Promise<any[]> {
        const events = await this.contract.queryFilter(
            this.contract.filters.TransactionRecorded(accountId)
        );
        return events.map(event => this.parseEvent(event));
    }

    private parseEvent(event: any): any {
        // Parse blockchain event data
        return {};
    }
}
