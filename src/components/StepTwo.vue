<template>
  <div>
    <h2>Clean Up Your Data</h2>
    <div>
      <p>Select the options to clean your data:</p>
      <label>
        <input type="checkbox" v-model="ignoreCapitalization" /> Ignore capitalization
      </label>
      <label>
        <input type="checkbox" v-model="ignorePunctuation" /> Ignore punctuation
      </label>
      <label>
        <input type="checkbox" v-model="ignoreNumbers" /> Ignore numbers
      </label>
    </div>

    <button @click="processData">Next</button>
  </div>
</template>

<script>
import { ref } from 'vue'; // Removed the watch import

export default {
  props: ['dataset'],
  setup(props, { emit }) {
    const ignoreCapitalization = ref(true);
    const ignorePunctuation = ref(true);
    const ignoreNumbers = ref(true);
    const processedData = ref({});

    const processData = () => {
      const allText = Object.values(props.dataset).join(''); // Join all values into a single string
      let cleanedText = allText;

      // Ignore capitalization
      if (ignoreCapitalization.value) {
        cleanedText = cleanedText.toLowerCase();
      }

      // Ignore punctuation
      if (ignorePunctuation.value) {
        // Remove punctuation using regex
        cleanedText = cleanedText.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
      }

      // Ignore numbers
      if (ignoreNumbers.value) {
        cleanedText = cleanedText.replace(/\d+/g, ''); // This is already fine
      }

      // Count unique characters after cleanup
      const characterCounts = {};
      for (const char of cleanedText) {
        if (char in characterCounts) {
          characterCounts[char]++;
        } else {
          characterCounts[char] = 1;
        }
      }

      console.log("Processed Character Counts:", characterCounts); // For debugging
      processedData.value = characterCounts;

      // Emit processed data to App.vue
      emit('cleanedDataReady', processedData.value);
    };

    return {
      ignoreCapitalization,
      ignorePunctuation,
      ignoreNumbers,
      processData,
    };
  },
};
</script>

<style scoped>
/* Add any styles needed for StepTwo here */
</style>
