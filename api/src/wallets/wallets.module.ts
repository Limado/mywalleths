import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletMiddleware } from './schemas/wallet.schema';
@Module({
    imports: [MongooseModule.forFeatureAsync([WalletMiddleware])],
    controllers: [WalletsController],
    providers: [WalletsService]
})
export class WalletsModule { }
