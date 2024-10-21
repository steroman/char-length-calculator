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
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const useOwnData = ref('false');
    const fileData = ref(null);
    const error = ref('');
    const canProceed = ref(false); // Initially disabled

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            console.log("Uploaded data:", data); // For debugging
            fileData.value = data; // Store file data
            error.value = ''; // Clear error
            canProceed.value = true; // Enable next button
          } catch (e) {
            error.value = 'Invalid JSON file. Please upload a valid JSON file.';
            fileData.value = null; // Reset on error
            canProceed.value = false; // Disable next button
          }
        };
        reader.readAsText(file);
      } else {
        error.value = 'Please upload a valid JSON file.';
        fileData.value = null; // Reset on error
        canProceed.value = false; // Disable next button
      }
    };

    const submitData = () => {
      if (fileData.value || useOwnData.value === 'false') {
        emit('datasetSelected', fileData.value || { /* Default dataset */ }); // Replace with your default dataset
      }
    };

    return {
      useOwnData,
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
