<template>
    <div>
      <h1>JSON File Processor</h1>
      <!-- File Upload -->
      <input type="file" @change="handleFileUpload" accept=".json" />
      
      <!-- Error message if the JSON exceeds key limits -->
      <p v-if="error" class="error">{{ error }}</p>
  
      <!-- Display results -->
      <div v-if="jsonData">
        <p>Total Keys: {{ Object.keys(jsonData).length }}</p>
        <p>Total Character Length: {{ totalCharLength }}</p>
        <button @click="downloadProcessedJSON">Download Processed JSON</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const jsonData = ref(null);
  const error = ref(null);
  const totalCharLength = ref(0);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    error.value = null;
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          // Parse JSON from file
          const parsed = JSON.parse(e.target.result);
          const keys = Object.keys(parsed);
          
          // Ensure it's under the 5000 key-value pair limit
          if (keys.length > 5000) {
            error.value = "File exceeds 5000 key-value pairs limit!";
            jsonData.value = null;
            return;
          }
          
          jsonData.value = parsed;
  
          // Calculate total character length of all keys and values
          totalCharLength.value = calculateCharLength(parsed);
  
        } catch (err) {
          error.value = "Invalid JSON file!";
        }
      };
  
      reader.readAsText(file);
    }
  };
  
  // Helper function to calculate total character length
  const calculateCharLength = (jsonObj) => {
    let length = 0;
    for (const [key, value] of Object.entries(jsonObj)) {
      length += key.length + String(value).length;
    }
    return length;
  };
  
  // Function to trigger JSON download
  const downloadProcessedJSON = () => {
    const blob = new Blob([JSON.stringify(jsonData.value, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "processed.json";
    link.click();
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  