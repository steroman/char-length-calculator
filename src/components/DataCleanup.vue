<template>
    <div>
      <h2>Data Cleanup Options</h2>
      <label><input type="checkbox" v-model="ignoreCapitals" /> Ignore Capitals</label>
      <label><input type="checkbox" v-model="ignorePunctuation" /> Ignore Punctuation</label>
      <label><input type="checkbox" v-model="ignoreNumbers" /> Ignore Numbers</label>
      <button @click="confirmChoices">Confirm</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { ignoreCapitals: false, ignorePunctuation: false, ignoreNumbers: false };
    },
    methods: {
      confirmChoices() {
        this.$emit("cleanupOptionsSelected", {
          ignoreCapitals: this.ignoreCapitals,
          ignorePunctuation: this.ignorePunctuation,
          ignoreNumbers: this.ignoreNumbers,
        });
      }
    }
  };
  </script>
  