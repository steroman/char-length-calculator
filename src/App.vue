<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>
    <StepOne @datasetSelected="handleDatasetSelection" />
  </div>
</template>

<script>
import StepOne from './components/StepOne.vue'; // Import StepOne component

export default {
  components: {
    StepOne, // Register the StepOne component
  },
  setup() {
    // Event handler for dataset selection
    const handleDatasetSelection = (data) => {
      console.log("Dataset selected:", data);
      // You can proceed to the next step or process the data further here.
    };

    return {
      handleDatasetSelection,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
</style>
