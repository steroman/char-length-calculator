<template>
  <div>
    <h2>Step 3: Define Character Widths</h2>
    <div v-if="!Object.keys(characterWidths).length">No characters available.</div>
    <div v-else>
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
      <button @click="submitWidths">Submit Widths</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    cleanedData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    console.log("Received cleaned data:", props.cleanedData);
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

    // Watch for changes in cleanedData to initialize character widths
    watch(() => props.cleanedData, (newData) => {
      if (newData) {
        initCharacterWidths(); // Initialize widths whenever cleanedData is updated
      }
    });

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
