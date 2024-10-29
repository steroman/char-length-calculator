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
      isGeneric: false,
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
    handleLocalization(data, type) {
    if (type === "none") {
      console.log("Localization is not applied.");
      this.localizationData = null;
    } else if (type === "own") {
      console.log("User-provided localization data received:", data);
      this.localizationData = data;
    } else if (type === "generic") {
      console.log("Generic localization expansion applied.");
      this.localizationData = data; // Assume generic expansion data is provided
    }
    this.step = 6; // Move to the final step after localization selection
  },
    goToPreviousStep() {
      if (this.step > 1) {
        this.step--;
        console.log(`Moving to step: ${this.step}`);
      }
    },
    goToNextStep() {
  console.log(`Current step: ${this.step}`);

  switch (this.step) {
    case 1:
      if (!this.dataset) {
        alert("Please select a dataset.");
        return;
      }
      break;
    case 2:
      break;
    case 3:
      if (!this.availableSpace) {
        alert("Please enter a valid button width.");
        return;
      }
      this.processData();  // Process data after button width is provided
      break;
    case 4:
      if (!this.validateCharacterWidths()) {
        alert("Character widths are missing or invalid. Please enter valid widths.");
        return;
      }
      break;
    case 5:
      this.calculateResults();
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
      this.isGeneric = isGeneric;
      console.log("Dataset received:", this.dataset, "Is Generic:", this.isGeneric);
      this.step = 2;
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
    handleButtonWidth(width) {
      console.log("Button width received:", width);
      this.availableSpace = width;
      if (!this.availableSpace) {
        console.error("Button width is invalid or not set.");
      }
    },
    handleCleanupOptions(options) {
      this.cleanupOptions = {
        ignoreCapitals: options.ignoreCapitals ?? false,
        ignorePunctuation: options.ignorePunctuation ?? false,
        ignoreNumbers: options.ignoreNumbers ?? false,
      };
      console.log("Final cleanup options after defaulting missing values:", this.cleanupOptions);
    },
    handleWidths(widths) {
      console.log("Received widths from CharacterWidthInput:", widths);
      
      // Deep clone the widths to ensure Vue reactivity is retained across steps
      this.characterWidths = JSON.parse(JSON.stringify(widths));

      // Validate if characterWidths retains all keys before moving forward
      for (const char in this.processedData) {
        if (!(char in this.characterWidths) || this.characterWidths[char] <= 0) {
          console.error(`Character ${char} is missing or has invalid width in characterWidths.`);
        }
      }
    },
    validateCharacterWidths() {
      return Object.values(this.characterWidths).every(width => width > 0);
    },
    
    calculateResults() {
      console.log("Calculating results with the following data:");
      console.log("Character Widths:", this.characterWidths); 
      console.log("Processed Data:", this.processedData);

      const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);

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
      console.log("Final Max Length:", this.maxLength);
      console.log("Character Summary:", this.characterSummary);
    }
  }
};
</script>
