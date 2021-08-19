<template>
  <b-col class="walletInfo" variant="secondary">
    <span class="exchange-title mb-2">Exchange rate</span>
    <div id="exchange-buttons">
      <b-iconstack
        v-show="!editing"
        v-on:click="setEditing"
        class="exchange-icon"
      >
        <b-icon stacked icon="pencil-square"></b-icon>
      </b-iconstack>

      <b-iconstack
        v-show="editing"
        v-on:click="cancelEdit"
        class="exchange-icon"
      >
        <b-icon stacked icon="square"></b-icon>
        <b-icon stacked icon="x"></b-icon>
      </b-iconstack>

      <b-iconstack
        v-show="editing"
        v-on:click="confirmEdit"
        class="exchange-icon"
      >
        <b-icon stacked icon="square"></b-icon>
        <b-icon stacked icon="check"></b-icon>
      </b-iconstack>
    </div>
    <b-form-input
      v-if="editing"
      id="exchange-rate"
      class="mb-2 mt-4 mr-sm-2 mb-sm-0"
      placeholder=""
      v-model="rateValue"
    ></b-form-input>
    <b-form-input
      v-if="!editing"
      disabled
      class="mb-2 mt-4 mr-sm-2 mb-sm-0"
      placeholder=""
      v-model="rates[rate]"
    ></b-form-input>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default Vue.extend({
  name: "ExchangeRate",
  data: () => {
    return { editing: false, rateValue: "" };
  },
  computed: {
    ...mapState("ExchangeStore", ["rates", "rate"]),
    ...mapState("WalletsStore", ["wallet"]),
    ...mapGetters("WalletsStore", ["isWalletSelected"]),
  },
  methods: {
    ...mapActions("ExchangeStore", ["saveRate", "getRates"]),
    ...mapMutations("WalletsStore", ["setCalculatedBalance"]),
    setEditing() {
      this.editing = true;
      this.rateValue = this.rates[this.rate];
    },
    cancelEdit() {
      this.editing = false;
      this.rateValue = this.rates[this.rate];
    },
    confirmEdit() {
      this.editing = false;
      //only decimal numbers
      const regexp = /^\d+(\.\d*)?$/;
      if (regexp.test(this.rateValue)) {
        this.saveRate(this.rateValue);
        this.setCalculatedBalance({
          balance: this.wallet.balance,
          rate: this.rateValue,
        });
      } else {
        this.rateValue = this.rates[this.rate];
      }
    },
  },
  mounted() {
    this.getRates();
  },
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#exchange-buttons {
  float: right;
  margin-bottom: 1%;
}
.exchange-icon {
  margin-left: 4px;
  cursor: pointer;
}
.exchange-title {
  float: left;
}
</style>

