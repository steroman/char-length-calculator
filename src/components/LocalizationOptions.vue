<template>
  <div>
    <h2>Localization Options</h2>
    <label><input type="radio" v-model="option" value="own" /> Use Own Dataset</label>
    <label><input type="radio" v-model="option" value="generic" /> Use Generic Dataset</label>
    <input v-if="option === 'own'" type="file" @change="handleFileUpload" accept=".json" />
    <button v-if="option === 'generic'" @click="selectGeneric">Select Generic Expansion</button>
  </div>
</template>

<script>
export default {
  data() {
    return { option: null };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => this.$emit("localizationSelected", JSON.parse(reader.result), "own");
      reader.readAsText(file);
    },
    selectGeneric() {
      this.$emit("localizationSelected", /* provide generic expansion data */ "generic");
    }
  }
};
</script>
