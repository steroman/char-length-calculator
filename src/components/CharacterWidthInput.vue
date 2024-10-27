<template>
    <div>
      <h2>Character Width Input</h2>
      <div v-for="(frequency, char) in processedData" :key="char">
        <span>{{ char }} ({{ frequency * 100 }}%):</span>
        <input type="number" v-model="widths[char]" />
      </div>
      <button @click="submitWidths">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ["processedData"],
    data() {
      return { widths: {} };
    },
    methods: {
      submitWidths() {
        this.$emit("widthsSubmitted", this.widths);
      }
    }
  };
  </script>
  