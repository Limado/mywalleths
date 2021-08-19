import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
    controllers: [WalletsController],
    providers: [WalletsService]
})
export class WalletsModule { }
