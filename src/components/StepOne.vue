<template>
  <div>
    <h2>Select Dataset</h2>
    <div>
      <label>
        <input type="radio" v-model="useOwnData" value="true" /> Use my own data
      </label>
      <label>
        <input type="radio" v-model="useOwnData" value="false" /> Use default dataset
      </label>
    </div>

    <div v-if="useOwnData === 'true'">
      <input type="file" @change="handleFileUpload" />
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>

    <button :disabled="!canProceed" @click="submitData">Next</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup(props, { emit }) {
    const useOwnData = ref('false');
    const fileData = ref(null);
    const error = ref('');
    const canProceed = ref(false);

    // Watch for changes to fileData to enable/disable the Next button
    watch(fileData, (newValue) => {
      canProceed.value = !!newValue; // Enable Next button if fileData has content
    });

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            fileData.value = JSON.parse(e.target.result);
            error.value = ''; // Clear any previous errors
          } catch (e) {
            error.value = 'Invalid JSON file. Please upload a valid JSON file.';
            fileData.value = null; // Reset fileData on error
          }
        };
        reader.readAsText(file);
      } else {
        error.value = 'Please upload a valid JSON file.';
        fileData.value = null; // Reset fileData on error
      }
    };

    const submitData = () => {
      if (fileData.value) {
        emit('datasetSelected', fileData.value); // Emit the data back to App.vue
      }
    };

    return {
      useOwnData,
      fileData,
      handleFileUpload,
      error,
      canProceed,
      submitData,
    };
  },
};
</script>

<style scoped>
/* Add any styles needed for StepOne here */
</style>
