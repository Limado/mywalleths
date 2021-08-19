<template>
  <div class="Right Panel">
    <div for="text-address" class="mt-2 title">
      <h4 v-if="!isWalletSelected">Select a wallet</h4>
      <b-form-checkbox
        v-if="isWalletSelected"
        v-model="wallet.isFavourite"
        name="check-button"
        variant="secondary"
        class="check"
        v-on:change="favourite"
        :disabled="callingApi"
      >
        &nbsp;{{ wallet.name }} is {{ wallet.isFavourite ? "" : "not" }}
        <b>favourite</b>
      </b-form-checkbox>
      <span v-if="isWalletSelected"> 
      Address : {{ wallet.address }}
      </span>
    </div>
    <div class="isOld">
      <b-alert variant="danger" :show="isOld">
        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
        Wallet is old! First transaction on
        {{
          isOld ? new Date(wallet.firstTransactionTS * 1000).toISOString() : ""
        }}</b-alert
      >
    </div>
    <b-container>
      <b-row>
        <b-col><ExchangeRate class="infoPanel" /></b-col>
        <b-col><WalletInfo class="infoPanel" /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ExchangeRate from "./ExchangeRate.vue";
import WalletInfo from "./WalletInfo.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default Vue.extend({
  name: "RightPanel",
  components: { ExchangeRate, WalletInfo },
  computed: {
    ...mapState("WalletsStore", ["wallet"]),
    ...mapState("RequestStore", ["callingApi"]),
    ...mapGetters("WalletsStore", ["isOld", "isWalletSelected"]),
  },
  methods: {
    ...mapActions("WalletsStore", ["favourite"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.isOld {
  padding: 15px;
  text-align: left;
}
.Right.Panel {
  align-content: center;
}

.walletInfo {
  background-color: gainsboro;
  margin: 2%;
  padding: 4%;
  border: 1px solid darkgrey;
  border-radius: 4px;
}
.infoPanel {
  height: 150px;
}
</style>

