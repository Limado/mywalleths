import { Wallet, CreateWalletDto } from "@/components/interfaces/wallet.interface";
import { BalancePayload } from "@/components/interfaces/balance.payloda.interface";
import { myAxios as axios, myAxios } from '../../modules/axios';
import Web3 from 'web3';

const WalletsStore = {
    namespaced: true,
    state: {
        sortFav: true,
        etherValue: 0,
        calculatedBalance: 0,
        wallet: {},
        wallets: []
    },
    mutations: {
        selectWallet(state: any, payload: Wallet) {
            //state.wallet = state.wallets.find((w: Wallet) => w._id === payload._id);
            state.wallet = payload;
        },
        setCalculatedBalance(state: any, payload: BalancePayload) {
            
            const etherValue = Web3.utils.fromWei(payload.balance?.toString()||'0');
            state.calculatedBalance = (parseFloat(etherValue) * parseFloat(payload.rate));
            state.etherValue = etherValue;
        },
        setWallets(state: any, actionGetWallets: Wallet[]) {
            state.wallets = actionGetWallets;
        },
        sortWallets(state: any, changeFav: boolean) {
            if (changeFav)
                state.sortFav = !state.sortFav;
            state.wallets.sort(function (a: any, b: any) { return (a.isFavourite === b.isFavourite) ? 0 : a.isFavourite ? (state.sortFav ? -1 : 1) : (state.sortFav ? 1 : -1); });
        }
    },
    getters: {
        isOld(state: any): boolean {
            const aYear = 31536000000;
            const today = Date.now();
            return ((today - aYear) > state.wallet.firstTransactionTS * 1000);
        },
        isWalletSelected(state: any): boolean {
            return state.wallet._id ? true : false;
        }
    },
    actions: {
        getWallets: async function ({ commit, rootState }: any) {
            const data = await axios.get(`/wallets`)
                .then((resp: any) => {
                    rootState.RequestStore.requestError = false;
                    rootState.RequestStore.requestErrorMessage = '';
                    return resp.data;
                })
                .catch((error: any) => {
                    console.log(error.response);
                    rootState.RequestStore.requestError = true;
                    rootState.RequestStore.requestErrorMessage = error.response.data.message;
                    return [];
                });

            commit('setWallets', data);
            commit('sortWallets', false);
        },
        getWallet: async function ({ commit, rootState }: any, id: string) {
            const data = await axios.get(`/wallets/${id}`)
                .then((resp: any) => {
                    rootState.RequestStore.requestError = false;
                    rootState.RequestStore.requestErrorMessage = '';
                    return resp.data;
                })
                .catch((error: any) => {
                    console.log(error.response);
                    rootState.RequestStore.requestError = true;
                    rootState.RequestStore.requestErrorMessage = error.response.data.message;
                    return [];
                });
            commit('selectWallet', data);
        },
        addWallet: async function ({ commit, dispatch, rootState }: any, walletDto: CreateWalletDto) {
            const data = await axios.post(`/wallets`, walletDto)
                .then((resp: any) => {
                    rootState.RequestStore.requestError = false;
                    rootState.RequestStore.requestErrorMessage = '';
                    dispatch('getWallets');
                    return resp.data;
                })
                .catch((error: any) => {
                    console.log(error.response);
                    rootState.RequestStore.requestError = true;
                    rootState.RequestStore.requestErrorMessage = error.response.data.message;
                    return [];
                });
        },
        favourite: function ({ dispatch, rootState, state }: any) {
            axios.put(`/wallets/favourite/${state.wallet._id}`, { isFavourite: state.wallet.isFavourite })
                .then((resp: any) => {
                    rootState.RequestStore.requestError = false;
                    rootState.RequestStore.requestErrorMessage = '';
                    dispatch('getWallets');
                })
                .catch((error: any) => {
                    console.log(error.response);
                    rootState.RequestStore.requestError = true;
                    rootState.RequestStore.requestErrorMessage = error.response.data.message;
                });
        }
    },
    modules: {
    }
}

export default WalletsStore;