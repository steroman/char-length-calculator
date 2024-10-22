<template>
  <div>
    <h2>Step 1: Select Your Dataset</h2>

    <!-- Radio buttons for choosing dataset -->
    <div>
      <label>
        <input type="radio" value="default" v-model="datasetChoice" @change="updateCanProceed" />
        Use default dataset
      </label>
      <label>
        <input type="radio" value="upload" v-model="datasetChoice" @change="updateCanProceed" />
        Upload your JSON file
      </label>
    </div>

    <!-- File input appears only when user chooses to upload their dataset -->
    <div v-if="datasetChoice === 'upload'">
      <input type="file" @change="handleFileUpload" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  setup(props, { emit }) {
    // No dataset prop here, since it should not be needed in StepOne
    const datasetChoice = ref('default');
    const isFileUploaded = ref(false);

    // Emit event to parent to notify about the canProceed state
    const updateCanProceed = () => {
      emit('canProceed', canProceed.value);
    };

    // Check if the user can proceed
    const canProceed = computed(() => {
      return datasetChoice.value === 'default' || isFileUploaded.value;
    });

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            emit('datasetSelected', jsonData); // Emit the uploaded dataset
            isFileUploaded.value = true;
            updateCanProceed(); // Update parent about canProceed state
          } catch (error) {
            alert("Invalid JSON file. Please upload a valid JSON file.");
          }
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a valid JSON file.");
      }
    };

    return {
      datasetChoice,
      handleFileUpload,
      updateCanProceed,
    };
  },
};
</script>

<style scoped>
/* Add styles if needed */
</style>
