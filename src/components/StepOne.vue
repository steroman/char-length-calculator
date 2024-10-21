<template>
  <div>
    <h2>Step 1: Choose Your Dataset</h2>
    <div>
      <label>
        <input type="radio" value="own" v-model="datasetChoice" /> Use My Own Data
      </label>
      <label>
        <input type="radio" value="default" v-model="datasetChoice" /> Use Default Dataset
      </label>
    </div>

    <div v-if="datasetChoice === 'own'">
      <input type="text" v-model="mainLanguage" placeholder="Enter main language" />
      <input type="file" @change="handleFileUpload" accept=".json" />
      <div v-if="additionalLanguages.length > 0">
        <button @click="addLanguage">Add Another Language</button>
        <div v-for="(lang, index) in additionalLanguages" :key="index">
          <input type="text" v-model="lang.name" placeholder="Enter additional language" />
          <input type="file" @change="(e) => handleFileUpload(e, index)" accept=".json" />
        </div>
      </div>
      <button @click="nextStep" :disabled="!isOwnDataValid">Next</button>
    </div>

    <div v-if="datasetChoice === 'default'">
      <p>Main Language: English</p>
      <button @click="nextStep">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['datasetSelected']); // Define emitted events

const datasetChoice = ref(null);
const mainLanguage = ref('');
const additionalLanguages = ref([]);
const jsonData = ref({}); // Store uploaded JSON data

// Function to handle file upload
const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const parsedData = JSON.parse(e.target.result);
      if (index !== undefined) {
        additionalLanguages.value[index].data = parsedData; // Store secondary language data
      } else {
        jsonData.value.mainLanguageData = parsedData; // Store main language data
      }
    } catch (err) {
      console.error("Invalid JSON file!", err);
    }
  };

  reader.readAsText(file);
};

// Add another language input
const addLanguage = () => {
  additionalLanguages.value.push({ name: '', data: null });
};

// Validate own data
const isOwnDataValid = computed(() => {
  return mainLanguage.value && jsonData.value.mainLanguageData && additionalLanguages.value.every(lang => lang.data);
});

// Next step logic
const nextStep = () => {
  const languagesData = {
    main: {
      name: mainLanguage.value,
      data: jsonData.value.mainLanguageData,
    },
    additional: additionalLanguages.value,
  };
  emit('datasetSelected', languagesData); // Emit event
};
</script>

<style scoped>
/* Add your styles here */
</style>
