<template>
  <div>
    <DatasetInput @datasetSelected="handleDatasetSelection" v-if="step === 1" />
    <DataCleanup @cleanupOptionsSelected="handleCleanupOptions" v-if="step === 2" />
    <CharacterWidthInput @widthsSubmitted="handleWidths" :processedData="processedData" v-if="step === 3" />
    <LocalizationOptions @localizationSelected="handleLocalization" v-if="step === 4" />
    <CalculationResults :maxLength="maxLength" :expandedMaxLength="expandedMaxLength" :characterSummary="characterSummary" v-if="step === 5" />
  </div>
</template>

<script>
import DatasetInput from './components/DatasetInput.vue';
import DataCleanup from './components/DataCleanup.vue';
import CharacterWidthInput from './components/CharacterWidthInput.vue';
import LocalizationOptions from './components/LocalizationOptions.vue';
import CalculationResults from './components/CalculationResults.vue';

// Import the data processing function
import { cleanAndCountCharacters } from './utils/dataProcessing.js';

export default {
  components: {
    DatasetInput,
    DataCleanup,
    CharacterWidthInput,
    LocalizationOptions,
    CalculationResults
  },
  data() {
  return {
    step: 1,
    dataset: null,
    cleanupOptions: {},
    processedData: {},
    maxLength: null,
    expandedMaxLength: null,
    characterSummary: {},
    isGeneric: null, // Add here for potential use later
  };
},
methods: {
  handleDatasetSelection(data, isGeneric) { 
    this.dataset = data;
    this.isGeneric = isGeneric; // Store in data
    this.step = 2;
  },
    handleCleanupOptions(options) { 
      this.cleanupOptions = options;
      
      // Process dataset with cleanup options and calculate character frequencies
      this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
      
      // Move to CharacterWidthInput step with processed data
      this.step = 3;
    },
    handleWidths(widths) { 
      console.log("Widths submitted", widths);
      this.step = 4;
    },
    handleLocalization(data, type) { 
      console.log("Localization options selected", data, type);
      this.step = 5;
    }
  }
};
</script>
