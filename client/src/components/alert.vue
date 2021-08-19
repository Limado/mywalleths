<template>
  <div>
    <b-alert
      show
      fade
      :variant="requestError ? 'danger' : 'primary'"
    >
      {{ requestErrorMessage || "Last request errors shown here." }}
      <br />
    </b-alert>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "RequestAlert",
  props: {
    requestErrorMessage: String,
    requestError: Boolean,
  },
});
</script>