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
    <button @click="prevStep" v-if="step > 1">Back</button>
    <button @click="nextStep" v-if="step < totalSteps">Next</button>
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

    // Update to return actual component references
    const currentStepComponent = computed(() => {
      switch (step.value) {
        case 1: return StepOne;
        case 2: return StepTwo;
        case 3: return StepThree;
        case 4: return StepFour;
        default: return StepOne; // Fallback to StepOne
      }
    });

    const nextStep = () => {
      if (step.value < totalSteps) {
        step.value++;
        console.log(`Moving to Step: ${step.value}`);
      }
    };

    const prevStep = () => {
      if (step.value > 1) {
        step.value--;
        console.log(`Moving to Step: ${step.value}`);
      }
    };

    // Event handlers
    const handleDatasetSelection = (data) => {
      languagesData.value = data;
      nextStep();
    };

    const handleCleanupComplete = (data) => {
      cleanupData.value = data;
      nextStep();
    };

    const handleButtonWidth = (width) => {
      buttonWidth.value = width;
      nextStep();
    };

    const handleResultsCalculation = (calculatedResults) => {
      results.value = calculatedResults;
      // Display results in Step 4
      nextStep();
    };

    return {
      step,
      currentStepComponent,
      nextStep,
      prevStep,
      handleDatasetSelection,
      handleCleanupComplete,
      handleButtonWidth,
      handleResultsCalculation,
      languagesData,
      cleanupData,
      buttonWidth,
      results,
    };
  },
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
</style>
