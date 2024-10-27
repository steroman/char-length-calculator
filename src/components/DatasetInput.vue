<template>
    <div>
      <h2>Select Data Set</h2>
      <button @click="useGenericDataset">Use Generic Data Set</button>
      <input type="file" @change="handleFileUpload" accept=".json" />
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => this.$emit("datasetSelected", JSON.parse(reader.result), false);
        reader.readAsText(file);
      },
      useGenericDataset() {
        this.$emit("datasetSelected", /* load or reference generic dataset here */ true);
      }
    }
  };
  </script>
  