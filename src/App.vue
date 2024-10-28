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
    // isGeneric: null,
    characterWidths: {}
  };
},
// methods: {
//   goToNextStep() {
//     console.log(`Current step: ${this.step}`);
//     console.log("Current cleanupOptions in goToNextStep:", this.cleanupOptions);

//     switch (this.step) {
//       case 1:
//         // Step 1: Dataset selection - No processing here, only store dataset
//         console.log("Dataset selected:", this.dataset);
//         break;
//       case 2:
//         // Step 2: Cleanup options - Only store options, defer processing
//         console.log("Cleanup options set:", this.cleanupOptions);
//         break;
//       case 3:
//         // Step 3: Button width - Only store width, defer processing
//         console.log("Button width (availableSpace):", this.availableSpace);
//         if (!this.availableSpace) {
//           alert("Please enter a valid button width.");
//           return;
//         }
//         // Defer processing until after all inputs are gathered
//         this.processData();
//         break;
//       case 4:
//         console.log("Character widths before validation:", this.characterWidths);
//         if (!this.validateCharacterWidths()) {
//           alert("Character widths are missing or invalid. Please enter valid widths.");
//           return;
//         }
//         console.log("Character widths validated. Proceeding to calculate widths.");
//         this.handleWidths();
//         break;
//       case 5:
//         this.handleLocalization();
//         break;
//       default:
//         break;
//     }
//     this.step++;
//     console.log(`Moving to step: ${this.step}`);
//   },

//   processData() {
//     console.log("Processing data with cleanup options and dataset.");
//     this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
//     console.log("Processed data:", this.processedData);
//   },

//   handleDatasetSelection(dataset, isGeneric) {
//     if (!dataset) {
//       alert("Please select a dataset to continue.");
//       return;
//     }
//     this.dataset = dataset;
//     this.isGeneric = isGeneric;
//     console.log("Dataset and isGeneric set:", this.dataset, this.isGeneric);
//     this.step = 2; // Move to the next step after selection
//   },

//   handleCleanupOptions(options) {
//     this.cleanupOptions = {
//       ignoreCapitals: options.ignoreCapitals ?? false,
//       ignorePunctuation: options.ignorePunctuation ?? false,
//       ignoreNumbers: options.ignoreNumbers ?? false,
//     };
//     console.log("Final cleanup options after defaulting missing values:", this.cleanupOptions);
//   },

//   handleButtonWidth(width) {
//     console.log("Button width received:", width);
//     this.availableSpace = width;
//   },

//   validateCharacterWidths() {
//     const allWidthsValid = Object.values(this.characterWidths).every(width => width > 0);
//     console.log("All character widths valid:", allWidthsValid);
//     return allWidthsValid;
//   },

//   handleWidths() {
//     const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);
//     console.log("Average character width calculated:", avgCharWidth);

//     if (!avgCharWidth) {
//       alert("Average character width is zero, cannot calculate max length.");
//       return;
//     }

//     this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
//     console.log("Calculated maxLength:", this.maxLength);

//     this.expandedMaxLength = this.maxLength;
//     this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
//       char,
//       frequency: data.frequency,
//       count: data.count,
//       width: this.characterWidths[char] || 0,
//     }));
//     console.log("Character summary:", this.characterSummary);
//   },
//   handleLocalization() {
//     console.log("Localization options handled.");
//   }
// }
// methods: {
//   goToNextStep() {
//     console.log(`Current step: ${this.step}`);

//     switch (this.step) {
//       case 1:
//         console.log("Dataset selected:", this.dataset);
//         break;
//       case 2:
//         console.log("Cleanup options set:", this.cleanupOptions);
//         break;
//       case 3:
//         console.log("Button width (availableSpace):", this.availableSpace);
//         if (!this.availableSpace) {
//           alert("Please enter a valid button width.");
//           return;
//         }
//         break;
//       case 4:
//         console.log("Character widths before validation:", this.characterWidths);
//         if (!this.validateCharacterWidths()) {
//           alert("Character widths are missing or invalid. Please enter valid widths.");
//           return;
//         }
//         this.processData(); // Process data only after all necessary inputs are ready
//         break;
//       case 5:
//         this.handleLocalization();
//         break;
//       default:
//         break;
//     }
//     this.step++;
//     console.log(`Moving to step: ${this.step}`);
//   },

//   processData() {
//     console.log("Processing data with cleanup options and dataset.");

//     // Process dataset and ensure characters are sorted alphabetically
//     this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
//     console.log("Processed data:", this.processedData);

//     // Sort characters alphabetically after processing
//     this.processedData = Object.fromEntries(
//       Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
//     );
//   },

//   handleDatasetSelection(dataset, isGeneric) {
//     if (!dataset) {
//       alert("Please select a dataset to continue.");
//       return;
//     }
//     this.dataset = dataset;
//     this.isGeneric = isGeneric;
//     this.step = 2; // Move to the next step after selection
//   },

//   handleCleanupOptions(options) {
//     this.cleanupOptions = {
//       ignoreCapitals: options.ignoreCapitals ?? false,
//       ignorePunctuation: options.ignorePunctuation ?? false,
//       ignoreNumbers: options.ignoreNumbers ?? false,
//     };
//   },

//   handleButtonWidth(width) {
//     console.log("Button width received:", width);
//     this.availableSpace = width;
//   },

//   validateCharacterWidths() {
//     const allWidthsValid = Object.values(this.characterWidths).every(width => width > 0);
//     return allWidthsValid;
//   },

//   handleWidths() {
//     const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);

//     if (!avgCharWidth) {
//       alert("Average character width is zero, cannot calculate max length.");
//       return;
//     }

//     this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
//     this.expandedMaxLength = this.maxLength;
//     this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
//       char,
//       frequency: data.frequency,
//       count: data.count,
//       width: this.characterWidths[char] || 0,
//     }));
//   },

//   handleLocalization() {
//     console.log("Localization options handled.");
//   }
// }
// methods: {
//   goToNextStep() {
//     console.log(`Current step: ${this.step}`);

//     switch (this.step) {
//       case 1:
//         // No processing here; only collect dataset
//         console.log("Dataset selected:", this.dataset);
//         break;
//       case 2:
//         // Collect cleanup options, no processing yet
//         console.log("Cleanup options set:", this.cleanupOptions);
//         break;
//       case 3:
//         // Store button width, then process data
//         console.log("Button width (availableSpace):", this.availableSpace);
//         if (!this.availableSpace) {
//           alert("Please enter a valid button width.");
//           return;
//         }
//         this.processData();  // Process data here after width is set
//         break;
//       case 4:
//         // Ensure character widths are valid before final calculations
//         console.log("Character widths before validation:", this.characterWidths);
//         if (!this.validateCharacterWidths()) {
//           alert("Character widths are missing or invalid. Please enter valid widths.");
//           return;
//         }
//         this.handleWidths(); // Calculate maxLength and other final metrics
//         break;
//       case 5:
//         this.handleLocalization();
//         break;
//       default:
//         break;
//     }
//     this.step++;
//     console.log(`Moving to step: ${this.step}`);
//   },

//   processData() {
//     console.log("Processing data with cleanup options and dataset.");
//     this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
//     console.log("Processed data:", this.processedData);

//     // Sort processed characters alphabetically for Character Width Input step
//     this.processedData = Object.fromEntries(
//       Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
//     );
//   },

//   handleDatasetSelection(dataset, isGeneric) {
//     if (!dataset) {
//       alert("Please select a dataset to continue.");
//       return;
//     }
//     this.dataset = dataset;
//     this.isGeneric = isGeneric;
//     console.log("Dataset and isGeneric set:", this.dataset, this.isGeneric);
//     this.step = 2; // Move to the next step after selection
//   },

//   handleCleanupOptions(options) {
//     this.cleanupOptions = {
//       ignoreCapitals: options.ignoreCapitals ?? false,
//       ignorePunctuation: options.ignorePunctuation ?? false,
//       ignoreNumbers: options.ignoreNumbers ?? false,
//     };
//     console.log("Cleanup options set:", this.cleanupOptions);
//   },

//   handleButtonWidth(width) {
//     this.availableSpace = width;
//     console.log("Button width (availableSpace) set to:", this.availableSpace);
//   },

//   validateCharacterWidths() {
//     const allWidthsValid = Object.values(this.characterWidths).every(width => width > 0);
//     console.log("All character widths valid:", allWidthsValid);
//     return allWidthsValid;
//   },

//   handleWidths() {
//     const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);
//     console.log("Average character width calculated:", avgCharWidth);

//     if (!avgCharWidth) {
//       alert("Average character width is zero, cannot calculate max length.");
//       return;
//     }

//     this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
//     console.log("Calculated maxLength:", this.maxLength);

//     this.expandedMaxLength = this.maxLength;
//     this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
//       char,
//       frequency: data.frequency,
//       count: data.count,
//       width: this.characterWidths[char] || 0,
//     }));
//   },

//   handleLocalization() {
//     console.log("Localization options handled.");
//   }
// }
// methods: {
//   goToNextStep() {
//     console.log(`Current step: ${this.step}`);

//     switch (this.step) {
//       case 1:
//         console.log("Dataset selected:", this.dataset);
//         break;
//       case 2:
//         console.log("Cleanup options set:", this.cleanupOptions);
//         break;
//       case 3:
//         console.log("Button width (availableSpace):", this.availableSpace);
//         if (!this.availableSpace) {
//           alert("Please enter a valid button width.");
//           return;
//         }
//         // No calculation here - just move to the next step
//         break;
//       case 4:
//         console.log("Character widths before validation:", this.characterWidths);
//         if (!this.validateCharacterWidths()) {
//           alert("Character widths are missing or invalid. Please enter valid widths.");
//           return;
//         }
//         this.calculateResults(); // Only call calculateResults after validating character widths
//         break;
//       case 5:
//         this.handleLocalization();
//         break;
//       default:
//         break;
//     }
//     this.step++;
//     console.log(`Moving to step: ${this.step}`);
//   },

//   calculateResults() {
//     console.log("Calculating results...");

//     // Calculate the average character width
//     const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);
//     console.log("Average character width calculated:", avgCharWidth);

//     if (!avgCharWidth) {
//       alert("Average character width is zero, cannot calculate max length.");
//       return;
//     }

//     // Calculate the max length based on the available space and average character width
//     this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
//     console.log("Calculated maxLength:", this.maxLength);

//     // Set expandedMaxLength and characterSummary
//     this.expandedMaxLength = this.maxLength;
//     this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
//       char,
//       frequency: data.frequency,
//       count: data.count,
//       width: this.characterWidths[char] || 0,
//     }));
//     console.log("Character summary:", this.characterSummary);
//   },

//   handleLocalization() {
//     console.log("Localization options handled.");
//   },

//   validateCharacterWidths() {
//     const allWidthsValid = Object.values(this.characterWidths).every(width => width > 0);
//     console.log("All character widths valid:", allWidthsValid);
//     return allWidthsValid;
//   },
// }
methods: {
  // goToNextStep() {
  //   console.log(`Current step: ${this.step}`);

  //   switch (this.step) {
  //     case 1:
  //       // Step 1: Handle dataset selection and move to cleanup options
  //       if (!this.dataset) {
  //         alert("Please select a dataset.");
  //         return;
  //       }
  //       this.handleDatasetSelection();
  //       console.log("Dataset selected:", this.dataset);
  //       break;
  //     case 2:
  //       // Step 2: Cleanup options step, defer processing until button width is set
  //       console.log("Cleanup options set:", this.cleanupOptions);
  //       break;
  //     case 3:
  //       // Step 3: Button width input, defer calculations until after width is validated
  //       console.log("Button width (availableSpace):", this.availableSpace);
  //       if (!this.availableSpace) {
  //         alert("Please enter a valid button width.");
  //         return;
  //       }
  //       this.processData(); // Process data after button width is provided
  //       break;
  //     case 4:
  //       // Step 4: Character width input step, calculate results if character widths are valid
  //       console.log("Character widths before validation:", this.characterWidths);
  //       if (!this.validateCharacterWidths()) {
  //         alert("Character widths are missing or invalid. Please enter valid widths.");
  //         return;
  //       }
  //       this.calculateResults();
  //       break;
  //     case 5:
  //       this.handleLocalization();
  //       break;
  //     default:
  //       break;
  //   }
  //   this.step++;
  //   console.log(`Moving to step: ${this.step}`);
  // },
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

  // handleDatasetSelection() {
  //   if (!this.dataset) {
  //     alert("Please select a dataset to continue.");
  //     return;
  //   }
  //   console.log("Dataset selected with cleanup options:", this.cleanupOptions);
  //   // After setting dataset, proceed to next step (cleanup options)
  //   this.step = 2; // Proceed to Step 2 (Cleanup Options)
  // },
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

  // processData() {
  //   console.log("Processing data with cleanup options and dataset.");

  //   // Process dataset with `cleanAndCountCharacters`
  //   this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
  //   console.log("Processed data:", this.processedData);

  //   // Sort processed characters alphabetically
  //   this.processedData = Object.fromEntries(
  //     Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
  //   );
  // },
  processData() {
      console.log("Processing data with cleanup options and dataset.");
      this.processedData = cleanAndCountCharacters(this.dataset, this.cleanupOptions);
      console.log("Processed data:", this.processedData);

      // Sort processed characters alphabetically
      this.processedData = Object.fromEntries(
        Object.entries(this.processedData).sort(([a], [b]) => a.localeCompare(b))
      );
    },

  // calculateResults() {
  //   console.log("Calculating results...");

  //   const avgCharWidth = calculateAverageWidth(this.characterWidths, this.processedData);
  //   console.log("Average character width calculated:", avgCharWidth);

  //   if (!avgCharWidth) {
  //     alert("Average character width is zero, cannot calculate max length.");
  //     return;
  //   }

  //   this.maxLength = Math.floor(this.availableSpace / avgCharWidth);
  //   console.log("Calculated maxLength:", this.maxLength);

  //   this.expandedMaxLength = this.maxLength;
  //   this.characterSummary = Object.entries(this.processedData).map(([char, data]) => ({
  //     char,
  //     frequency: data.frequency,
  //     count: data.count,
  //     width: this.characterWidths[char] || 0,
  //   }));
  //   console.log("Character summary:", this.characterSummary);
  // },
  // handleLocalization() {
  //   console.log("Localization options handled.");
  // },
  // validateCharacterWidths() {
  //   const allWidthsValid = Object.values(this.characterWidths).every(width => width > 0);
  //   console.log("All character widths valid:", allWidthsValid);
  //   return allWidthsValid;
  // },
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
