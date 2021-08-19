import { ETHScan } from 'src/etherscan/etherscan';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true, unique: true })
    address: string;
    @Prop()
    balance: string;
    @Prop()
    firstTransactionTS: number;
    @Prop()
    lastConnection: string;
    @Prop()
    isFavourite: boolean;
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);

export const WalletMiddleware = {
    name: Wallet.name,
    useFactory: async () => {
        const schema = WalletSchema;
        schema.pre('save', await preSave);
        return schema;
    },
}

const preSave = async function (next, done) {
    // console.log(`Getting from Etherscan.io`);
    // //console.log(this)
    // let data = await ETHScan.getBalance(this.address);
    // if (data.status == 1) {
    //     console.log(`Ok >>>>>>>>>>>>>>>>>>>>>>>>>> ${data.result}`);
    //     this.update({ balance: data.result })
    //     next();
    // }
    // else {
    //     next(new Error(data.result));
    //     console.log(`Error >>>>>>>>>>>>>>>>>>>>>>>>>> ${data.result}`);
    // }
}

// WalletSchema.path('name').validate(async (name) => {
// }, validationErrorMessage('name'));


WalletSchema.path('balance').get(function(balance){
    return balance; 
});