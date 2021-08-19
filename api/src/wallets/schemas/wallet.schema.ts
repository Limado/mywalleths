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
        return schema;
    },
}

WalletSchema.path('balance').get(function(balance){
    return balance; 
});