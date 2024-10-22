<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>

    <!-- Dynamically render the current step component -->
    <component 
      :is="currentStepComponent"
      @datasetSelected="handleDatasetSelection" 
      @canProceed="setCanProceed"
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
    const cleaningOptions = ref({
      ignoreCapitalization: true,
      ignorePunctuation: true,
      ignoreNumbers: true,
    });

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

    // Create a computed object for props passed to the component
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
        // We need to clean the data based on the selected options
        const processedData = processData(dataset.value, cleaningOptions.value);
        cleanedData.value = processedData; // Store cleaned data
        canProceed.value = true; // Enable 'Next' for Step 3
      }
      if (step.value < totalSteps) {
        step.value++;
      }
    };

    const processData = (data, options) => {
      let processedData = {};
      for (const key in data) {
        let value = data[key];

        // Clean based on selected options
        if (options.ignorePunctuation) {
          value = value.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        }
        if (options.ignoreNumbers) {
          value = value.replace(/\d+/g, '');
        }
        if (options.ignoreCapitalization) {
          value = value.toLowerCase();
        }

        processedData[key] = value;
      }
      console.log("Processed Data:", processedData);
      return processedData;
    };

    const prevStep = () => {
      if (step.value > 1) {
        step.value--;
      }
    };

    const handleDatasetSelection = (data) => {
      dataset.value = data;
      console.log("Dataset selected:", data);
      setCanProceed(true); // Enable Next button when a dataset is selected
    };

    const setCanProceed = (value) => {
      canProceed.value = value;
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
      handleCleanedDataReady,
      setCanProceed,
      canProceed,
      dataset,
      cleanedData,
      cleaningOptions, // Add cleaningOptions to the return
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
