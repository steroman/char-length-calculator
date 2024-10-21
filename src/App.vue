<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>
    <component 
      :is="currentStepComponent" 
      @datasetSelected="handleDatasetSelection"
      @cleanupComplete="handleCleanupComplete"
      @buttonWidthSubmitted="handleButtonWidth"
      @resultsCalculated="handleResultsCalculation">
    </component>

    <!-- Step Navigation -->
    <button @click="prevStep" v-if="step > 1">Back</button>
    <button @click="nextStep" :disabled="!canProceedToNextStep">Next</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';
import StepFour from './components/StepFour.vue';

export default {
  setup() {
    const step = ref(1);
    const totalSteps = 4;
    const languagesData = ref(null);
    const cleanupData = ref(null);
    const buttonWidth = ref(null);
    const results = ref(null);

    const currentStepComponent = computed(() => {
      switch (step.value) {
        case 1:
          return StepOne;
        case 2:
          return StepTwo;
        case 3:
          return StepThree;
        case 4:
          return StepFour;
        default:
          return StepOne;
      }
    });

    const canProceedToNextStep = computed(() => {
      switch (step.value) {
        case 1:
          return languagesData.value !== null; // Allow proceeding if data is selected (default or file)
        case 2:
          return cleanupData.value !== null;
        case 3:
          return buttonWidth.value !== null;
        case 4:
          return results.value !== null;
        default:
          return false;
      }
    });

    const handleDatasetSelection = (data) => {
      languagesData.value = data; // Set the selected dataset
    };

    const handleCleanupComplete = (data) => {
      cleanupData.value = data;
    };

    const handleButtonWidth = (width) => {
      buttonWidth.value = width;
    };

    const handleResultsCalculation = (calculatedResults) => {
      results.value = calculatedResults;
    };

    const nextStep = () => {
      if (step.value < totalSteps) step.value++;
    };

    const prevStep = () => {
      if (step.value > 1) step.value--;
    };

    return {
      step,
      currentStepComponent,
      nextStep,
      prevStep,
      canProceedToNextStep,
      handleDatasetSelection,
      handleCleanupComplete,
      handleButtonWidth,
      handleResultsCalculation,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
