<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <RequestAlert
            :requestError="requestError"
            :requestErrorMessage="requestErrorMessage"
        /></b-col>
      </b-row>
      <b-row>
        <b-col><LeftPanel /></b-col>
        <b-col cols="8"><RightPanel /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LeftPanel from "./components/LeftPanel/LeftPanel.vue";
import RightPanel from "./components/RightPanel/RightPanel.vue";
import RequestAlert from "./components/alert.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default Vue.extend({
  name: "App",
  components: {
    LeftPanel,
    RightPanel,
    RequestAlert,
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapState("RequestStore", ["requestErrorMessage"]),
    ...mapGetters("RequestStore", ["requestError"]),
  },
  methods: {
    ...mapMutations("RequestStore", ["dissmissError"]),
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.Panel {
  border: solid 1px black;
  box-shadow: darkgrey;
  border-radius: 8px;
}

.title {
  border-bottom: 1px solid #1c1f23;
  color: #1c1f23;
}
</style>
