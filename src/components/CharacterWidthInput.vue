<template>
  <div>
    <h2>Character Width Input</h2>
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Count</th>
          <th>Frequency (%)</th>
          <th>Width (Input)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, char) in processedData" :key="char">
          <td>{{ char }}</td>
          <td>{{ data.count }}</td>
          <td>{{ data.frequency ? (data.frequency * 100).toFixed(2) : 0 }}%</td>
          <td><input type="number" v-model.number="widths[char]" :placeholder="getDefaultWidth(char)" /></td>
        </tr>
      </tbody>
    </table>
    <button @click="submitWidths">Confirm Widths</button>
  </div>
</template>

<script>
export default {
  props: ["processedData"],
  data() {
    return {
      widths: {},
      defaultWidths: {
        a: 10, b: 11, c: 9, d: 11, e: 11, f: 8, g: 10, h: 10, i: 5, j: 5,
        k: 10, l: 6, m: 16, n: 11, o: 11, p: 11, q: 12, r: 7, s: 8, t: 8,
        u: 10, v: 10, w: 14, x: 10, y: 10, z: 9,
        punctuation: 3,
      },
    };
  },
  mounted() {
    console.log("Processed data received in CharacterWidthInput:", this.processedData);
    for (const char of Object.keys(this.processedData)) {
      this.widths[char] = this.getDefaultWidth(char);
    }
  },
  methods: {
    getDefaultWidth(char) {
      const lowerChar = char.toLowerCase();
      if (this.defaultWidths[lowerChar]) {
        return this.defaultWidths[lowerChar];
      } else if (/[- .,!?]/.test(char)) {
        return this.defaultWidths.punctuation;
      }
      return '';
    },
    submitWidths() {
      // Emit only after confirming widths
      this.$emit("widthsSubmitted", this.widths);
      console.log("Widths submitted:", this.widths);
    },
  }
};
</script>
