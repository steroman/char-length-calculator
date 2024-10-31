<template>
  <div>
    <DatasetInput @datasetSelected="handleDatasetSelection" v-if="step === 1" />
    <DataCleanup @cleanupOptionsSelected="handleCleanupOptions" v-if="step === 2" />
    <ButtonWidthInput @widthSubmitted="handleButtonWidth" v-if="step === 3" />
    <CharacterWidthInput
      @widthsSubmitted="handleWidths"
      :processedData="sortedProcessedData"
      v-if="step === 4"
    />
    <LocalizationOptions @localizationSelected="handleLocalization" v-if="step === 5" />
    <CalculationResults
      :maxLength="maxLength"
      :expandedMaxLength="expandedMaxLength"
      :characterSummary="sortedCharacterSummary"
      v-if="step === 6"
    />

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
      cleanupOptions: {
        ignoreCapitals: false,
        ignorePunctuation: false,
        ignoreNumbers: false,
      },
      processedData: {},
      characterSummary: [],
      availableSpace: null,
      maxLength: 0,
      expandedMaxLength: 0,
      characterWidths: {},
      avgInitialLength: 0,
      localizationData: null,
    };
  },
  computed: {
    sortedProcessedData() {
      return Object.fromEntries(Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b)));
    },
    sortedCharacterSummary() {
      return [...this.characterSummary].sort((a, b) => a.char.localeCompare(b.char));
    },
  },
  methods: {
    handleDatasetSelection(dataset) {
      if (!dataset) {
        alert("Please select a dataset.");
        return;
      }
      this.dataset = dataset;
      this.avgInitialLength = this.calculateAverageLength(dataset);
      this.step = 2;
      console.log("Dataset selected and avgInitialLength calculated:", this.avgInitialLength);
    },
    calculateAverageLength(data) {
      const totalLength = Object.values(data).reduce((sum, text) => sum + text.length, 0);
      return totalLength / Object.values(data).length || 1;
    },
    handleButtonWidth(width) {
      this.availableSpace = width;
      console.log("Button width set to:", width);
    },
    handleCleanupOptions(options) {
      this.cleanupOptions = options;
      console.log("Cleanup options applied:", options);
    },
    handleWidths(widths) {
      this.characterWidths = { ...widths };
      console.log("Character widths received and assigned:", this.characterWidths);
      // Confirm width values to avoid 0 entries in the final display
      this.processData();
    },
    processData() {
      this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
      console.log("Processed data with frequencies:", this.processedData);

      // Log `characterWidths` to confirm it is fully populated before generating `characterSummary`
      console.log("Using character widths to populate character summary:", this.characterWidths);

      this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
        char,
        frequency: data.frequency,
        count: data.count,
        width: this.characterWidths[char] || 0, // Fetch width for each character
      }));
      console.log("Character summary prepared:", this.characterSummary);
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
    handleLocalization(data, type) {
      console.log("Handling localization:", { data, type });
      if (type === "none") {
        this.expandedMaxLength = this.maxLength;
      } else if (type === "multi" && Array.isArray(data)) {
        this.localizationData = data;
        this.calculateExpansion();
      }
      this.step = 6;
    },
    calculateExpansion() {
      if (!this.localizationData) return;

      const expansionRates = this.localizationData.map(lang => {
        const expansionRate = (lang.avgLocalizedLength - this.avgInitialLength) / this.avgInitialLength;
        return expansionRate;
      });
      const maxExpansionRate = Math.max(...expansionRates);
      this.applyExpansion(maxExpansionRate);
    },
    applyExpansion(expansionRate) {
      this.expandedMaxLength = Math.floor(this.maxLength / (1 + expansionRate));
      console.log("Expanded max length adjusted for localization:", this.expandedMaxLength);
    },
    goToPreviousStep() {
      if (this.step > 1) {
        this.step--;
        console.log(`Moved to step: ${this.step}`);
      }
    },
    goToNextStep() {
      console.log(`Current step: ${this.step}`);
      switch (this.step) {
        case 1:
          if (!this.dataset) return alert("Please select a dataset.");
          break;
        case 3:
          if (!this.availableSpace) return alert("Please enter a valid button width.");
          this.processData();
          break;
        case 4:
          if (!this.validateCharacterWidths()) return alert("Character widths are missing or invalid.");
          this.calculateResults();
          break;
        case 5:
          return; // Wait for localization handling
      }
      this.step++;
    },
    validateCharacterWidths() {
      return Object.values(this.characterWidths).every(width => width > 0);
    },
  },
};
</script>
