import { Rates } from "@/components/interfaces/rates.interface";
const ExchangeStore = {
    namespaced: true,
    state: {
        rate: "usd",
        rates: { usd: 1, euro: 1 }
    },
    mutations: {
        selectRate(state: any, payload: string) {
            state.rate = payload;
        },
        changeRate(state: any, payload: number) {
            state.rates[state.rate] = payload;
        },
        setRates(state: any, payload: Rates) {

            state.rates = payload != null ? payload : state.rates;
        }
    },
    actions: {
        getRates: function ({ commit }: any) {
            const rates: any = localStorage.getItem('mywalleths_rates') || false;
            const data: any = rates ? JSON.parse(rates) : null;
            commit('setRates', data);
        },
        saveRate: function ({ commit, state }: any, payload: number) {
            state.rates[state.rate] = payload;
            localStorage.setItem('mywalleths_rates', JSON.stringify(state.rates));
        }
    },
    modules: {
    }
}

export default ExchangeStore;