<template>
  <div>
    <DatasetInput @datasetSelected="handleDatasetSelection" v-if="step === 1" />
    <DataCleanup @cleanupOptionsSelected="handleCleanupOptions" v-if="step === 2" />
    <ButtonWidthInput @widthSubmitted="handleButtonWidth" v-if="step === 3" />
    <CharacterWidthInput @widthsSubmitted="handleWidths" :processedData="processedData" v-if="step === 4" />
    <LocalizationOptions @localizationSelected="handleLocalization" v-if="step === 5" />
    <CalculationResults :maxLength="maxLength" :expandedMaxLength="expandedMaxLength" :characterSummary="characterSummary" v-if="step === 6" />

    <div>
      <button v-if="step > 1" @click="goToPreviousStep">Back</button>
      <button v-if="step < 6" @click="goToNextStep">Next</button>
    </div>
  </div>
</template>

<script>
import DatasetInput from './components/DatasetInput.vue';
import DataCleanup from './components/DataCleanup.vue';
import ButtonWidthInput from './components/ButtonWidthInput.vue';
import CharacterWidthInput from './components/CharacterWidthInput.vue';
import LocalizationOptions from './components/LocalizationOptions.vue';
import CalculationResults from './components/CalculationResults.vue';

import { cleanAndCountCharacters, calculateAverageWidth } from './utils/dataProcessing.js';

export default {
  components: {
    DatasetInput,
    DataCleanup,
    ButtonWidthInput,
    CharacterWidthInput,
    LocalizationOptions,
    CalculationResults,
  },
  data() {
  return {
    step: 1,
    dataset: null,
    isGeneric: null,
    cleanupOptions: {
      ignoreCapitals: false,
      ignorePunctuation: false,
      ignoreNumbers: false,
    },
    processedData: {},
    availableSpace: null,
    maxLength: 0,
    expandedMaxLength: 0,
    characterSummary: [],
    characterWidths: {}
  };
},
methods: {
  goToNextStep() {
      console.log(`Current step: ${this.step}`);

      switch (this.step) {
        case 1:
          if (!this.dataset) {
            alert("Please select a dataset.");
            return;
          }
          console.log("Dataset selected:", this.dataset);
          break;
        case 2:
          console.log("Cleanup options set:", this.cleanupOptions);
          break;
        case 3:
          console.log("Button width (availableSpace):", this.availableSpace);
          if (!this.availableSpace) {
            alert("Please enter a valid button width.");
            return;
          }
          this.processData(); // Process data after button width is provided
          break;
        case 4:
          console.log("Character widths before validation:", this.characterWidths);
          if (!this.validateCharacterWidths()) {
            alert("Character widths are missing or invalid. Please enter valid widths.");
            return;
          }
          this.calculateResults();
          break;
        case 5:
          this.handleLocalization();
          break;
        default:
          break;
      }
      this.step++;
      console.log(`Moving to step: ${this.step}`);
    },
  handleDatasetSelection(dataset, isGeneric) {
      if (!dataset) {
        alert("Please select a dataset to continue.");
        return;
      }
      this.dataset = dataset;
      this.isGeneric = isGeneric; // Store whether the dataset is generic
      console.log("Dataset received:", this.dataset, "Is Generic:", this.isGeneric);
      this.step = 2; // Move to the next step after dataset is set
    },
  processData() {
      console.log("Processing data with cleanup options and dataset.");
      this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
      console.log("Processed data:", this.processedData);

      // Sort processed characters alphabetically
      this.processedData = Object.fromEntries(
        Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
      );
    },
  calculateResults() {
      console.log("Calculating results...");
      const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);
      console.log("Average character width calculated:", avgCharWidth);

      if (!avgCharWidth) {
        alert("Average character width is zero, cannot calculate max length.");
        return;
      }

      this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
      this.expandedMaxLength = this.maxLength;
      this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
        char,
        frequency: data.frequency,
        count: data.count,
        width: this.characterWidths[char] || 0,
      }));
    },
    handleLocalization() {
      console.log("Localization options handled.");
    },
}
}
</script>
