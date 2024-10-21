<template>
  <div>
    <h2>Step 2: Clean Data</h2>
    <p>Choose options to clean your data:</p>
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
    <!-- Remove the Next button from here -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['dataset'],
  setup(props, { emit }) {
    const ignoreCapitalization = ref(true);
    const ignorePunctuation = ref(true);
    const ignoreNumbers = ref(true);

    const processData = () => {
      let processedData = {};

      for (const key in props.dataset) {
        const value = props.dataset[key];
        
        const cleanedValue = value
          .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '') // Remove punctuation
          .replace(/\d+/g, '') // Remove numbers
          .toLowerCase(); // Convert to lowercase

        processedData[key] = cleanedValue;
      }

      console.log("Processed Data:", processedData);
      emit('cleanedDataReady', processedData);
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
/* Add styles if needed */
</style>
