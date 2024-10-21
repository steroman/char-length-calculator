<template>
  <div>
    <h2>Step 3: Input Available Button Width</h2>
    <input type="number" v-model="buttonWidth" placeholder="Enter button width" />
    <p class="helper-text">Remember to subtract margins, paddings, and icons!</p>
    <button @click="nextStep" :disabled="!buttonWidth">Next</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['buttonWidthSubmitted']); // Define emitted events

const buttonWidth = ref(null);

// Next step logic
const nextStep = () => {
  emit('buttonWidthSubmitted', buttonWidth.value); // Emit event
};
</script>

<style scoped>
.helper-text {
  font-size: 12px;
  color: gray;
}
</style>
