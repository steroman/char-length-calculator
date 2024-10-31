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

    <!-- Show dataset options if the user selects 'yes' -->
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
      languageList: languageList,
    };
  },
  methods: {
    addLanguageUpload() {
      // Adds a new language option for the user to upload
      this.languages.push({ selectedLanguage: '', file: null, avgLocalizedLength: null });
    },
    handleFileUpload(event, index) {
      // Reads and parses the uploaded JSON file to calculate average text length
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const localizedData = JSON.parse(reader.result);
          const avgLocalizedLength = this.calculateAverageLength(localizedData);
          this.languages[index] = {
            ...this.languages[index],
            file: localizedData,
            avgLocalizedLength,
          };
          this.emitLanguages(); // Emit data after successful upload
        } catch (error) {
          alert('Error reading the file. Please ensure it’s a valid JSON file.');
          console.error('File read error:', error);
        }
      };
      reader.readAsText(file);
    },
    calculateAverageLength(data) {
      const totalLength = Object.values(data).reduce((sum, text) => sum + text.length, 0);
      return totalLength / Object.values(data).length;
    },
    emitLanguages() {
      // Prepare data for emitting, only emit when all required fields are complete
      const validLanguages = this.languages.filter(language => language.file && language.selectedLanguage);
      if (validLanguages.length === this.languages.length) {
        const languagesData = validLanguages.map(language => ({
          code: language.selectedLanguage,
          avgLocalizedLength: language.avgLocalizedLength,
        }));
        this.$emit('localizationSelected', languagesData, 'multi');
      } else {
        console.log("Waiting for all language data to be completed before emitting.");
      }
    },
  },
  watch: {
    includeLocalization(newVal) {
      // Emit immediately if "No" is selected
      if (newVal === 'no') {
        this.$emit('localizationSelected', null, 'none');
      }
    },
  },
};
</script>
