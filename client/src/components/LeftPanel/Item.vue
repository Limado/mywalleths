<template>
  <b-list-group-item
    class="item"
    :class="wallet._id == item._id ? 'itemActive' : ''"
    :disabled="callingApi"
    v-on:click="onClick"
  >
    {{ item.name }}
    <b-icon v-show="item.isFavourite" icon="star-fill" class="icon"></b-icon>
  </b-list-group-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default Vue.extend({
  name: "Item",
  props: {
    item: Object,
  },
  computed: {
    ...mapState("ExchangeStore", ["rates", "rate"]),
    ...mapState("RequestStore", ["callingApi"]),
    ...mapState("WalletsStore", ["wallet"]),
  },
  methods: {
    ...mapMutations("WalletsStore", ["setCalculatedBalance"]),
    ...mapMutations("RequestStore", ["setCallingApi"]),
    ...mapActions("WalletsStore", ["getWallet"]),
    async onClick() {
      this.setCallingApi(true);
      await this.getWallet(this.item._id);
      this.setCallingApi(false);
      this.setCalculatedBalance({
        balance: this.wallet.balance,
        rate: this.rates[this.rate],
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item:hover,
.itemActive {
  cursor: pointer;
  background-color: blanchedalmond;
}
.item:active {
  background-color: burlywood;
}
.icon {
  float: left;
}
</style>


