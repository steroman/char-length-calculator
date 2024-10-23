<template>
  <div>
    <h2>Step 2: Clean Data</h2>
    <p>Choose options to clean your data:</p>
    <label>
      <input type="checkbox" v-model="ignoreCapitalization" />
      Ignore Capitalization
    </label>
    <label>
      <input type="checkbox" v-model="ignorePunctuation" />
      Ignore Punctuation
    </label>
    <label>
      <input type="checkbox" v-model="ignoreNumbers" />
      Ignore Numbers
    </label>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    }
  },
  
  setup(props, { emit }) {
    const ignoreCapitalization = ref(true);
    const ignorePunctuation = ref(true);
    const ignoreNumbers = ref(true);

    // Method to emit cleaning options back to the parent component
    const emitCleaningOptions = () => {
      emit('cleaningOptionsSelected', {
        ignoreCapitalization: ignoreCapitalization.value,
        ignorePunctuation: ignorePunctuation.value,
        ignoreNumbers: ignoreNumbers.value,
      });
    };

    return {
      ignoreCapitalization,
      ignorePunctuation,
      ignoreNumbers,
      emitCleaningOptions,
    };
  },
};
</script>
