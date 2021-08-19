<template>
  <div class="Panel">
    <AddItem />
    <ListItem />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ListItem from "./ListItem.vue";
import AddItem from "./AddItem.vue";

export default Vue.extend({
  name: "LeftPanel",
  components: { ListItem, AddItem },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

