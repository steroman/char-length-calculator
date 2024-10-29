<template>
  <div>
    <h2>Localization Options</h2>
    <p>Would you like to account for localization text expansion?</p>
    <label>
      <input type="radio" v-model="includeLocalization" value="yes" />
      Yes
    </label>
    <label>
      <input type="radio" v-model="includeLocalization" value="no" />
      No
    </label>

    <!-- Show dataset options only if the user selects 'yes' -->
    <div v-if="includeLocalization === 'yes'">
      <p>Select a localization dataset:</p>
      <label>
        <input type="radio" v-model="option" value="own" />
        Use Own Dataset
      </label>
      <label>
        <input type="radio" v-model="option" value="generic" />
        Use Generic Dataset
      </label>

      <!-- Input for uploading a custom dataset -->
      <input
        v-if="option === 'own'"
        type="file"
        @change="handleFileUpload"
        accept=".json"
      />

      <!-- Button to select the generic dataset -->
      <button v-if="option === 'generic'" @click="selectGeneric">Select Generic Expansion</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      includeLocalization: null, // Tracks user's localization choice
      option: null, // Tracks dataset choice if localization is enabled
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () =>
        this.$emit("localizationSelected", JSON.parse(reader.result), "own");
      reader.readAsText(file);
    },
    selectGeneric() {
      this.$emit("localizationSelected", /* provide generic expansion data */ "generic");
    },
    nextStep() {
      if (this.includeLocalization === "no") {
        // Skip localization and proceed to results
        this.$emit("localizationSelected", null, "none");
      } else if (this.includeLocalization === "yes" && this.option) {
        // Proceed only if the user selected either "own" or "generic" dataset
        if (this.option === "own") {
          // Wait for user to upload a file before emitting
          if (!this.uploadedFileData) {
            alert("Please upload your own dataset file to proceed.");
            return;
          }
        } else if (this.option === "generic") {
          this.selectGeneric();
        }
      } else {
        alert("Please make a complete selection to proceed.");
      }
    },
  },
  watch: {
    // Watch the includeLocalization option to skip directly if "No" is selected
    includeLocalization(newVal) {
      if (newVal === "no") {
        this.nextStep();
      }
    },
  },
};
</script>
