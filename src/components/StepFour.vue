<template>
  <div>
    <h2>Step 4: Results</h2>
    <p v-if="results">Results:</p>
    <p v-else>No results available yet.</p>
    <div v-if="results">
      <p>Average Character Width (Main Language): {{ results.averageWidth }}</p>
      <p v-for="(expansion, lang) in results.expansions" :key="lang">
        Average Text Expansion for {{ lang }}: {{ expansion }}%
      </p>
      <p>Maximum Length: {{ results.maxLength }}</p>
      <p>Adjusted Length: {{ results.adjustedLength }}</p>
    </div>
    <button @click="finish">Finish</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['finished']); // Define emitted events

const results = ref(null);

// Listen to parent component for results
// Since we're not using a specific function for handling results, you may want to emit results here directly.

const finish = () => {
  emit('finished'); // Emit event
};
</script>

<style scoped>
/* Add your styles here */
</style>
