<template>
  <div>
    <b-form inline>
      <h4 for="text-address" class="mt-2">Add new wallet</h4>
      <b-row class="inline">
        <b-col lg="12" sm="12"
          ><b-form-input
            v-model="name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Wallet name"
          ></b-form-input
        ></b-col>
      </b-row>
      <b-row class="inline">
        <b-col lg="9" sm="12"
          ><b-form-input
            v-model="address"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Wallet address 0x..."
          ></b-form-input
        ></b-col>
        <b-col lg="3" sm="12"
          ><b-button
            block
            variant="primary"
            class="w-100"
            :disabled="(address.length <= 0 || name.length <= 0 || callingApi)"
            v-on:click="add"
            >Add</b-button
          ></b-col
        >
      </b-row>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default Vue.extend({
  name: "AddItem",
  data() {
    return {
      name: "",
      address: "",
    };
  },
  computed: {
    ...mapState("RequestStore", ["callingApi"]),
  },
  methods: {
    ...mapActions("WalletsStore", ["addWallet", "getWallets"]),
    ...mapMutations("RequestStore", ["setCallingApi"]),
    async add() {
      this.setCallingApi(true);
      await this.addWallet({ name: this.name, address: this.address });
      this.setCallingApi(false);
      this.name = "";
      this.address = "";
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inline {
  margin: 5px;
}
</style>

