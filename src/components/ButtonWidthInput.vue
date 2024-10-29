<template>
  <div>
    <h2>Enter Button Width</h2>
    <label for="button-width">Button Width (in pixels):</label>
    <input
      type="number"
      id="button-width"
      v-model.number="buttonWidth"
      @input="emitWidth"
      placeholder="Enter button width"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonWidth: null,
    };
  },
  methods: {
    emitWidth() {
      this.$emit("widthSubmitted", this.buttonWidth); // Always emit current button width
    },
  },
};
</script>