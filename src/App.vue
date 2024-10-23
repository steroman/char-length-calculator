<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>
    <component 
      :is="currentStepComponent"
      @datasetSelected="handleDatasetSelection" 
      @cleaningOptionsSelected="handleCleaningOptions"
      @cleanedDataReady="handleCleanedDataReady"
      v-bind="componentProps"
      :key="step"
    />
    
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
    const dataset = ref(null);
    const cleanedData = ref(null);
    const canProceed = ref(false);

    // State for cleaning options
    const ignoreCapitalization = ref(true);
    const ignorePunctuation = ref(true);
    const ignoreNumbers = ref(true);

    const currentStepComponent = computed(() => {
      switch (step.value) {
        case 1:
          return StepOne;
        case 2:
          return StepTwo;
        case 3:
          return StepThree;
        default:
          return StepOne;
      }
    });

    const componentProps = computed(() => {
      const props = {};
      if (step.value === 2 && dataset.value) {
        props.dataset = dataset.value;
      }
      if (step.value === 3 && cleanedData.value) {
        props.cleanedData = cleanedData.value;
      }
      return props;
    });

    const nextStep = () => {
      if (step.value === 2) {
        // Clean the data based on the selected options
        const processedData = processData(dataset.value, {
          ignoreCapitalization: ignoreCapitalization.value,
          ignorePunctuation: ignorePunctuation.value,
          ignoreNumbers: ignoreNumbers.value,
        });
        cleanedData.value = processedData; // Store cleaned data
        canProceed.value = true; // Enable 'Next' for Step 3
      }

      if (step.value < totalSteps) {
        step.value++;
      }
    };

    const prevStep = () => {
      if (step.value > 1) step.value--;
    };

    const handleDatasetSelection = (data) => {
      dataset.value = data;
      console.log("Dataset selected:", data);
      canProceed.value = true;
    };

    const handleCleaningOptions = (options) => {
      ignoreCapitalization.value = options.ignoreCapitalization;
      ignorePunctuation.value = options.ignorePunctuation;
      ignoreNumbers.value = options.ignoreNumbers;
    };

    const handleCleanedDataReady = (data) => {
      cleanedData.value = data;
      console.log("Cleaned data:", data);
    };

    return {
      step,
      totalSteps,
      currentStepComponent,
      componentProps,
      nextStep,
      prevStep,
      handleDatasetSelection,
      handleCleaningOptions,
      handleCleanedDataReady,
      canProceed,
      dataset,
      cleanedData,
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
