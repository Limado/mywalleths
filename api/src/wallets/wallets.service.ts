import { Model } from 'mongoose';
import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Etherscan } from 'src/etherscan/etherscan';

@Injectable()
export class WalletsService {
    ETHScan: Etherscan
    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) {
        this.ETHScan = new Etherscan(process.env.ETH_API_KEY, process.env.ETH_API_URL);
     }

    async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        const createdWallet = new this.walletModel(createWalletDto);

        console.log(`Getting from Etherscan.io`);
        createdWallet.balance = await this.ETHScan.getBalance(createdWallet.address);
        createdWallet.lastConnection = new Date().getTime().toString();
        createdWallet.firstTransactionTS = await this.ETHScan.firstTransactionTS(createdWallet.address);
        createdWallet.isFavourite = false;
        return await createdWallet.save();
    }

    async findAll(): Promise<Wallet[]> {
        return await this.walletModel.find().exec();
    }

    async findById(id: string): Promise<Wallet> {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            let foundWallet = await this.walletModel.findById(id);
            if (!foundWallet) return this.emptyWallet();
            foundWallet.balance = await this.ETHScan.getBalance(foundWallet.address);
            foundWallet.lastConnection = new Date().getTime().toString();
            return await foundWallet;
        }
        else
            throw new HttpException('Invalid id format', HttpStatus.BAD_REQUEST);
    }
    async favourite(id: string, favourite: any) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            await this.walletModel.findByIdAndUpdate(id, favourite);
        }
        else
            throw new HttpException('Invalid id format', HttpStatus.BAD_REQUEST);
    }

    private emptyWallet() {
        return Promise.resolve().then(() => { return new Wallet(); });
    }
}
