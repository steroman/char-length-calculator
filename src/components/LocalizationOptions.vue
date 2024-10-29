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
      includeLocalization: null,
      option: null,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const localizedData = JSON.parse(reader.result);
          const avgLocalizedLength = this.calculateAverageLength(localizedData);
          this.$emit("localizationSelected", { avgLocalizedLength }, "own");
        } catch (error) {
          alert("Error reading the file.");
        }
      };
      reader.readAsText(file);
    },
    selectGeneric() {
      const genericExpansion = 0.3;
      this.$emit("localizationSelected", { expansionRate: genericExpansion }, "generic");
    },
    calculateAverageLength(data) {
      const totalLength = Object.values(data).reduce((sum, text) => sum + text.length, 0);
      return totalLength / Object.values(data).length || 1;
    },
    nextStep() {
      if (this.includeLocalization === "no") {
        this.$emit("localizationSelected", null, "none");
      } else if (this.includeLocalization === "yes" && this.option) {
        if (this.option === "own") {
          alert("Please upload your dataset.");
        } else if (this.option === "generic") {
          this.selectGeneric();
        }
      } else {
        alert("Complete the selection to proceed.");
      }
    },
  },
  watch: {
    includeLocalization(newVal) {
      if (newVal === "no") this.nextStep();
    },
  }
};

</script>
