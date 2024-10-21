<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>
    <component 
      :is="currentStepComponent" 
      @datasetSelected="handleDatasetSelection" 
      @canProceed="setCanProceed"
      :key="step"
    ></component>

    <button @click="prevStep" v-if="step > 1">Back</button>
    <button @click="nextStep" v-if="step < totalSteps" :disabled="!canProceed">Next</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';

export default {
  setup() {
    const step = ref(1);
    const totalSteps = 3;
    const dataset = ref(null); // Store the dataset here
    const canProceed = ref(false); // State for Next button

    const currentStepComponent = computed(() => {
      switch (step.value) {
        case 1:
          return StepOne;
        case 2:
          return StepTwo;
        case 3:
          return StepThree;
        default:
          return StepOne; // Fallback
      }
    });

    const nextStep = () => {
      if (step.value < totalSteps) step.value++;
    };

    const prevStep = () => {
      if (step.value > 1) step.value--;
    };

    const handleDatasetSelection = (data) => {
      dataset.value = data; // Save dataset when selected
      console.log("Dataset selected:", data);
    };

    const setCanProceed = (value) => {
      canProceed.value = value; // Update canProceed state from child
    };

    return {
      step,
      totalSteps,
      currentStepComponent,
      nextStep,
      prevStep,
      handleDatasetSelection,
      setCanProceed,
      canProceed, // State for enabling the Next button
    };
  },
  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
</style>
