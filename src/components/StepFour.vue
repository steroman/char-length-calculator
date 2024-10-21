<template>
  <div>
    <h2>Results</h2>
    <div v-if="results && results.length">
      <p>Results: {{ results }}</p>
    </div>
    <div v-else>
      <p>No results calculated.</p>
    </div>
  </div>
</template>

<!-- <script>
export default {
  setup(props) {
    // If results is coming from props, you can access it like this:
    // const { results } = props;

    return {
      // If you don't need props, just return an empty object
    };
  },
};
</script> -->

<style scoped>
/* Add styles for StepFour here */
</style>
