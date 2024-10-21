<template>
  <div id="app">
    <h1>Text Expansion Calculator</h1>
    <component :is="currentStepComponent"></component>
    <button @click="prevStep" v-if="step > 1">Back</button>
    <button @click="nextStep" v-if="step < totalSteps">Next</button>
    <button @click="submit" v-if="step === totalSteps">Submit</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue';
import Step3 from './components/Step3.vue';
import Step4 from './components/Step4.vue';
import Step5 from './components/Step5.vue';

export default {
  setup() {
    const step = ref(1);
    const totalSteps = 5;

    const currentStepComponent = computed(() => `Step${step.value}`);

    const nextStep = () => {
      if (step.value < totalSteps) step.value++;
    };

    const prevStep = () => {
      if (step.value > 1) step.value--;
    };

    const submit = () => {
      console.log('Submitting data');
      // Handle the final submission logic
    };

    return {
      step,
      currentStepComponent,
      nextStep,
      prevStep,
      submit
    };
  },
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
</style>
