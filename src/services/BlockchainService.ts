import { ethers, Contract } from 'ethers';
import { config } from '../config/config';

export class BlockchainService {
    private provider: ethers.JsonRpcProvider;
    private contract: Contract;

    constructor() {
        this.provider = new ethers.JsonRpcProvider(config.blockchain.rpcUrl);
        this.contract = new Contract(
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

    async getEvents(eventName: string, fromBlock: number): Promise<any[]> {
        const filter = this.contract.filters[eventName]();
        const events = await this.contract.queryFilter(filter, fromBlock);
        return events.map((event: ethers.Log) => this.parseEvent(event));
    }

    private parseEvent(event: ethers.Log): any {
        return {
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            args: event.args
        };
    }
}
