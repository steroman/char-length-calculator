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
import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';
import StepFour from './components/StepFour.vue';
import StepFive from './components/StepFive.vue';

export default {
  setup() {
    const step = ref(1);
    const totalSteps = 5;

    const currentStepComponent = computed(() => {
      return `Step${['One', 'Two', 'Three', 'Four', 'Five'][step.value - 1]}`;
    });

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
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    StepFive
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
}
</style>
