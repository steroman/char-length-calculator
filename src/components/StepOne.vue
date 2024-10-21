<template>
  <div>
    <h2>Select Dataset</h2>
    <div>
      <label>
        <input type="radio" v-model="useOwnData" value="true" /> Use my own data
      </label>
      <label>
        <input type="radio" v-model="useOwnData" value="false" @change="emitDefaultDatasetSelected" /> Use default dataset
      </label>
    </div>

    <div v-if="useOwnData === 'true'">
      <input type="file" @change="handleFileUpload" />
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const useOwnData = ref('false');
    const fileData = ref(null);
    const error = ref('');

    const emitDefaultDatasetSelected = () => {
      if (useOwnData.value === 'false') {
        const defaultDataset = {
          // Example of default dataset
          "home_screen_button_explore": "Explore Now",
          "home_screen_button_learn_more": "Learn More",
          "settings_button_save": "Save Changes",
          "settings_button_cancel": "Cancel",
        };
        emit('datasetSelected', { data: defaultDataset, characters: extractUniqueCharacters(defaultDataset) });
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            const characters = extractUniqueCharacters(data);
            fileData.value = { data, characters };
            error.value = '';
            emit('datasetSelected', fileData.value); // Emit the data and characters
          } catch (e) {
            error.value = 'Invalid JSON file. Please upload a valid JSON file.';
            fileData.value = null;
          }
        };
        reader.readAsText(file);
      } else {
        error.value = 'Please upload a valid JSON file.';
        fileData.value = null;
      }
    };

    const extractUniqueCharacters = (data) => {
      const allText = Object.values(data).join('');
      const uniqueChars = new Set(allText.match(/[a-zA-Z]/g));
      return Array.from(uniqueChars);
    };

    return {
      useOwnData,
      handleFileUpload,
      emitDefaultDatasetSelected,
      error,
    };
  },
};
</script>
