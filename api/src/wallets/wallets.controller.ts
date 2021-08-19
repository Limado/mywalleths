import { Controller, Get, Post, Body, Param, UseFilters, Put } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {

    constructor(private walletService: WalletsService) { }

    @Get()
    findAll(): Promise<Wallet[]> {
        return this.walletService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Wallet> {
        return this.walletService.findById(id);
    }

    @Post()
    create(@Body() wallet: CreateWalletDto): Promise<Wallet> {
        return this.walletService.create(wallet);
    }

    @Put('favourite/:id')
    favourite(@Param('id') id: string, @Body() favourite: any) {
        return this.walletService.favourite(id, favourite);
    }
}
