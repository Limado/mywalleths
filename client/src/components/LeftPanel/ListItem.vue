<template>
  <div>
    <b-row class="inline">
      <b-col lg="9" sm="12">
        <h4 for="text-address" class="mt-2">My wallets</h4>
      </b-col>
      <b-col lg="3" sm="12">
        <b-button block variant="primary" class="w-100" v-on:click="sortWallets(true)"
          >Order</b-button
        >
      </b-col>
    </b-row>
    <b-list-group class="list">
      <Item v-for="wallet in wallets" :key="wallet._id" :item="wallet"/>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import Item from "./Item.vue";

export default Vue.extend({
  components: { Item },
  name: "ListItems",
  computed: {
    ...mapState("WalletsStore", ["wallets"]),
  },
  methods: {
    ...mapActions("WalletsStore", ["getWallets"]),
    ...mapMutations("WalletsStore", ["sortWallets"]),
  },
  mounted() {
    this.getWallets();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  margin: 15px;
}
.inline {
  margin: 5px;
}
</style>

