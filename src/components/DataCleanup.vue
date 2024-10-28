<template>
  <div>
    <h2>Data Cleanup Options</h2>
    <label><input type="checkbox" v-model="ignoreCapitals" @change="emitCleanupOptions" /> Ignore Capitals</label>
    <label><input type="checkbox" v-model="ignorePunctuation" @change="emitCleanupOptions" /> Ignore Punctuation</label>
    <label><input type="checkbox" v-model="ignoreNumbers" @change="emitCleanupOptions" /> Ignore Numbers</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ignoreCapitals: false,
      ignorePunctuation: false,
      ignoreNumbers: false,
    };
  },
  methods: {
    emitCleanupOptions() {
      // Emit the cleanup options, ensuring each property is present
      this.$emit("cleanupOptionsSelected", {
        ignoreCapitals: this.ignoreCapitals,
        ignorePunctuation: this.ignorePunctuation,
        ignoreNumbers: this.ignoreNumbers,
      });
    }
  }
};
</script>
