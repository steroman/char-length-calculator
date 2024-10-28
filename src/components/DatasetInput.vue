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
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            this.$emit("datasetSelected", jsonData, false); // Emit dataset and "isGeneric" flag as false
          } catch (error) {
            alert("Error loading JSON file. Please check the file format.");
            console.error("File load error:", error);
          }
        };
        reader.readAsText(file);
      },
      useGenericDataset() {
        // Emit a generic dataset for testing purposes
        this.$emit("datasetSelected", { /* generic dataset */ }, true);
      }
    }
  };
  </script>
  