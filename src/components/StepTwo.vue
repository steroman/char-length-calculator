<template>
  <div>
    <h2>Step 2: Clean Data</h2>
    <p>Choose options to clean your data:</p>

    <!-- Cleaning options -->
    <label>
      <input type="checkbox" v-model="ignoreCapitalization" />
      Ignore Capitalization
    </label>
    <label>
      <input type="checkbox" v-model="ignorePunctuation" />
      Ignore Punctuation
    </label>
    <label>
      <input type="checkbox" v-model="ignoreNumbers" />
      Ignore Numbers
    </label>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    }
  },

  setup() {
    const ignoreCapitalization = ref(true);
    const ignorePunctuation = ref(true);
    const ignoreNumbers = ref(true);

    return {
      ignoreCapitalization,
      ignorePunctuation,
      ignoreNumbers,
    };
  },
};
</script>

<style scoped>
/* Add styles if needed */
</style>
