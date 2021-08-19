<template>
  <b-col class="walletInfo">
    <!-- <span class="currency-title w-100 mb-2" v-if="isWalletSelected">
      Ether: {{ Number(etherValue).toLocaleString() }}</span
    > -->
    <span class="currency-title w-100 mb-2" v-if="isWalletSelected">
      Ether: {{ etherValue }}</span
    >
    <div>
      <b-form-select
        id="currency"
        class="mb-2 mr-sm-2 mb-sm-0 form-select mt-4"
        v-model="selected"
        :options="options"
        v-on:change="setBalance"
      ></b-form-select>
      <div id="balance" class="mt-2 currency-title w-100">
        <span v-if="isWalletSelected">
          Balance: {{ Number(calculatedBalance).toLocaleString() }}</span
        >
        <!-- <span v-if="isWalletSelected"> Balance: {{ calculatedBalance }}</span> -->
        <span v-if="isWalletSelected"> {{ currencySymbol }}</span>
      </div>
    </div>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
export default Vue.extend({
  name: "WalletInfo",
  data: () => {
    return {
      balance: 0,
      selected: "usd",
      options: [],
    };
  },
  computed: {
    currencySymbol() {
      return (
        this.options?.find((x: any) => x.value == this.selected)?.symbol || ""
      );
    },
    ...mapState("ExchangeStore", ["rates"]),
    ...mapState("WalletsStore", ["wallet", "calculatedBalance", "etherValue"]),
    ...mapGetters("WalletsStore", ["isWalletSelected"]),
  },
  methods: {
    ...mapMutations("ExchangeStore", ["selectRate"]),
    ...mapMutations("WalletsStore", ["setCalculatedBalance"]),
    setBalance() {
      let rate = this.options.find((x) => x.value == this.selected).value;
      this.selectRate(rate);
      this.setCalculatedBalance({
        balance: this.wallet.balance,
        rate: this.rates[this.selected],
      });
    },
  },
  mounted() {
    this.options = [
      { value: "usd", text: "USD", symbol: "u$d" },
      { value: "euro", text: "Euro", symbol: "€" },
    ];
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.currency-title {
  float: left;
  text-align: left;
}
</style>

