<template>
  <div>
    <h2>Step 3: Define Character Widths</h2>
    <div v-for="(width, char) in characterWidths" :key="char">
      <label>
        {{ char }}: 
        <input 
          type="number" 
          v-model.number="characterWidths[char]" 
          min="0" 
        />
      </label>
    </div>
    <!-- Remove the Next button from here -->
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['cleanedData'],
  setup(props, { emit }) {
    const characterWidths = ref({});

    const initCharacterWidths = () => {
      const uniqueChars = new Set();

      for (const key in props.cleanedData) {
        for (const char of props.cleanedData[key]) {
          uniqueChars.add(char);
        }
      }

      uniqueChars.forEach(char => {
        characterWidths.value[char] = 10; // Default width
      });
    };

    const submitWidths = () => {
      emit('widthsSubmitted', characterWidths.value);
      console.log("Widths submitted:", characterWidths.value);
    };

    initCharacterWidths();

    return {
      characterWidths,
      submitWidths,
    };
  },
};
</script>

<style scoped>
/* Add styles if needed */
</style>
