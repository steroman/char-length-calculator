<template>
  <div id="app">
    <StepOne v-if="currentStep === 1" @datasetSelected="goToStepTwo" />
    <StepTwo v-if="currentStep === 2" :dataset="dataset" @cleanedDataReady="handleCleanedData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';

export default {
  components: {
    StepOne,
    StepTwo,
  },
  setup() {
    const currentStep = ref(1);
    const dataset = ref({});

    const goToStepTwo = (data) => {
      dataset.value = data; // Store the dataset received from StepOne
      currentStep.value = 2; // Move to StepTwo
    };

    const handleCleanedData = (cleanedData) => {
      console.log("Cleaned data:", cleanedData); // For debugging
      // You can add logic here to handle the cleaned data for the next steps
    };

    return {
      currentStep,
      dataset,
      goToStepTwo,
      handleCleanedData,
    };
  },
};
</script>

<style>
/* Add any styles needed for App.vue here */
</style>
