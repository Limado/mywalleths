interface Wallet {
    _id: string;
    name: string;
    address: string;
    balance: string;
    firstTransactionTS: number;
    lastConnection: string;
    isFavourite: boolean;
}
interface CreateWalletDto {
    name: string;
    address: string;
}

export { Wallet, CreateWalletDto };