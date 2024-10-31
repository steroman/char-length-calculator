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

    <div v-if="includeLocalization === 'yes'">
      <button @click="addLanguageUpload">Add Language Upload</button>

      <div v-for="(language, index) in languages" :key="index" class="language-upload">
        <p>Select a language and upload the dataset:</p>
        <select v-model="language.selectedLanguage" :key="`language-${index}`">
          <option value="" disabled>Select a language</option>
          <option v-for="lang in languageList" :value="lang.code" :key="lang.code">{{ lang.name }}</option>
        </select>
        <input
          type="file"
          @change="event => handleFileUpload(event, index)"
          accept=".json"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageList } from '../utils/languageList.js';

export default {
  data() {
    return {
      includeLocalization: null,
      languages: [],
      languageList,
    };
  },
  methods: {
    addLanguageUpload() {
      this.languages.push({ selectedLanguage: '', avgLocalizedLength: null });
    },
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const localizedData = JSON.parse(reader.result);
          const avgLocalizedLength = this.calculateAverageLength(localizedData);
          this.languages[index] = {
            ...this.languages[index],
            avgLocalizedLength,
          };
          // No call to emit here; data will be emitted when user clicks Next
          console.log(`Data for language ${this.languages[index].selectedLanguage} uploaded.`);
        } catch (error) {
          alert('Error reading the file. Please ensure it’s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    },
    calculateAverageLength(data) {
      const totalLength = Object.values(data).reduce((sum, text) => sum + text.length, 0);
      return totalLength / Object.values(data).length || 1;
    },
    finalizeLocalization() {
      // Check if all selected languages have valid avgLocalizedLength data before emitting
      const completeLanguages = this.languages.filter(lang => lang.avgLocalizedLength && lang.selectedLanguage);
      if (completeLanguages.length === this.languages.length) {
        const languagesData = completeLanguages.map(language => ({
          code: language.selectedLanguage,
          avgLocalizedLength: language.avgLocalizedLength,
        }));
        this.$emit('localizationSelected', languagesData, 'multi');
      } else {
        alert("Please complete all language selections and file uploads.");
      }
    },
  },
  watch: {
    includeLocalization(newVal) {
      if (newVal === 'no') {
        this.$emit('localizationSelected', null, 'none');
      }
    },
  },
};
</script>
