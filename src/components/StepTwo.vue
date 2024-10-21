<template>
  <div>
    <h2>Step 2: Data Cleanup and Character Width Input</h2>
    <div>
      <label>
        <input type="checkbox" v-model="excludePunctuation" /> Exclude Punctuation
      </label>
      <label>
        <input type="checkbox" v-model="excludeNumbers" /> Exclude Numbers
      </label>
    </div>

    <h3>Character Width Input for Main Language</h3>
    <div v-for="(char, index) in mainLanguageCharacters" :key="index">
      <input
        type="number"
        v-model="char.width"
        placeholder="Width for {{ char.char }} (leave empty to skip)"
      />
    </div>

    <button @click="nextStep" :disabled="!isCharacterWidthsValid">Next</button>
  </div>
</template>

<script setup>
import { ref, computed, toRefs, watch, defineEmits, defineProps } from 'vue'; // Ensure defineProps is imported

const emit = defineEmits(['cleanupComplete']); // Define emitted events
const props = defineProps(['languagesData']); // Expecting languagesData from StepOne
const { main } = toRefs(props);
const excludePunctuation = ref(false);
const excludeNumbers = ref(false);
const mainLanguageCharacters = ref([]);

// Initialize character widths based on main language data
watch(main, (newLang) => {
  if (newLang.data) {
    mainLanguageCharacters.value = Object.keys(newLang.data).map(char => ({ char, width: null }));
  }
});

// Validate character widths
const isCharacterWidthsValid = computed(() => {
  return mainLanguageCharacters.value.every(char => char.width || char.width === null);
});

// Next step logic
const nextStep = () => {
  const cleanedData = {
    excludePunctuation: excludePunctuation.value,
    excludeNumbers: excludeNumbers.value,
    characterWidths: mainLanguageCharacters.value,
  };
  emit('cleanupComplete', cleanedData); // Emit event
};
</script>

<style scoped>
/* Add your styles here */
</style>
