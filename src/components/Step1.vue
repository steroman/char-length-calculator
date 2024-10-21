<template>
    <div>
      <h2>Step 1: Choose your dataset</h2>
      <div>
        <label>
          <input type="radio" value="default" v-model="datasetChoice" />
          Use Default Dataset
        </label>
        <label>
          <input type="radio" value="custom" v-model="datasetChoice" />
          Upload Your Own Dataset
        </label>
      </div>
  
      <div v-if="datasetChoice === 'custom'">
        <label>Upload your dataset: 
          <input type="file" @change="handleFileUpload" />
        </label>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const datasetChoice = ref('default');
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        console.log('File uploaded:', file);
        // Logic for file processing
      };
  
      return {
        datasetChoice,
        handleFileUpload
      };
    }
  };
  </script>
  