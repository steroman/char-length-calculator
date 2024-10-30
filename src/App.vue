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
      characterWidths: {},
      avgInitialLength: 0,
    };
  },
  methods: {
    handleLocalization(data, type) {
    console.log("Handling localization:", { data, type });
    if (type === "none") {
      this.expandedMaxLength = this.maxLength;
    } else if (type === "multi" && Array.isArray(data)) {
      // Calculate expansion rate for each language
      const expansionRates = data.map(lang => {
        const expansionRate = (lang.avgLocalizedLength - this.avgInitialLength) / this.avgInitialLength;
        return { code: lang.code, expansionRate };
      });

      // Find the highest expansion rate
      const maxExpansionRate = Math.max(...expansionRates.map(lang => lang.expansionRate));
      console.log("Max expansion rate found:", maxExpansionRate);

      // Apply the maximum expansion rate
      this.applyExpansion(maxExpansionRate);

      // Optionally, sort expansionRates by highest to lowest for later use in results
      this.sortedExpansionRates = expansionRates.sort((a, b) => b.expansionRate - a.expansionRate);
    } else {
      alert("Please complete the localization selection.");
      return;
    }
    this.step = 6; // Move to the results step
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
      case 3:
        if (!this.availableSpace) {
          alert("Please enter a valid button width.");
          return;
        }
        this.processData(); // Process data after button width is provided
        break;
      case 4:
        if (!this.validateCharacterWidths()) {
          alert("Character widths are missing or invalid.");
          return;
        }
        this.calculateResults(); // Calculate `maxLength` after widths are validated
        break;
      case 5:
        return; // Wait here; step transition will be handled in `handleLocalization`
      default:
        break;
    }
    this.step++;
  },
    async handleDatasetSelection(dataset, isGeneric) {
      if (!dataset) {
        alert("Please select a dataset.");
        return;
      }
      this.dataset = dataset;
      this.isGeneric = isGeneric;
      this.avgInitialLength = this.calculateAverageLength(this.dataset);
      this.step = 2;
    },
    calculateAverageLength(data) {
      const totalLength = Object.values(data).reduce((sum, text) => sum + text.length, 0);
      return totalLength / Object.values(data).length || 1;
    },
    applyExpansion(expansionRate) {
    this.expandedMaxLength = Math.floor(this.maxLength / (1 + expansionRate));
    console.log("Applied expansion rate:", expansionRate, "Adjusted expanded max length:", this.expandedMaxLength);
  },
    processData() {
      this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
      this.processedData = Object.fromEntries(
        Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
      );
      console.log("Processed data for character frequency:", this.processedData);
    },
    handleButtonWidth(width) {
      this.availableSpace = width;
    },
    handleCleanupOptions(options) {
      this.cleanupOptions = options;
    },
    handleWidths(widths) {
      this.characterWidths = { ...widths };
    },
    validateCharacterWidths() {
      return Object.values(this.characterWidths).every(width => width > 0);
    },
    calculateResults() {
    console.log("Calculating results...");
    const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);

    if (!avgCharWidth) {
      alert("Average character width is zero, cannot calculate max length.");
      return;
    }

    this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
    this.expandedMaxLength = this.maxLength; // Set initial expandedMaxLength
    console.log("Calculated maxLength:", this.maxLength);
  },
  },
};

</script>
