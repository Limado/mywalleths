import { Model } from 'mongoose';
import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ETHScan } from 'src/etherscan/etherscan';

@Injectable()
export class WalletsService {
    constructor(@InjectModel(Wallet.name) private walletModel: Model<WalletDocument>) { }

    async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
        console.log(createWalletDto)
        const createdWallet = new this.walletModel(createWalletDto);

        console.log(`Getting from Etherscan.io`);
        createdWallet.balance = await ETHScan.getBalance(createdWallet.address);
        createdWallet.lastConnection = new Date().getTime().toString();
        createdWallet.firstTransactionTS = await ETHScan.firstTransactionTS(createdWallet.address);
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
            foundWallet.balance = await ETHScan.getBalance(foundWallet.address);
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
