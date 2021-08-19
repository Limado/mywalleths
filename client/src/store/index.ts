import Vue from 'vue';
import Vuex from 'vuex';
import WalletsStore from './modules/wallet.store';
import ExchangeStore from './modules/exchange.store';
import RequestStore from './modules/request.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    WalletsStore, ExchangeStore, RequestStore
  }
});
