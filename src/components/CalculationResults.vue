<template>
  <div>
    <h2>Calculation Results</h2>
    <div v-if="!maxLength && !expandedMaxLength && !characterSummary.length">
      <p>No results to display.</p>
    </div>
    <div v-else>
      <p>Max Length: {{ maxLength }}</p>
      <p>Expanded Max Length: {{ expandedMaxLength }}</p>
      <h3>Character Summary:</h3>
      <table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Frequency (%)</th>
            <th>Count</th>
            <th>Width</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in characterSummary" :key="index">
            <td>{{ item.char }}</td>
            <td>{{ (item.frequency * 100).toFixed(2) }}%</td>
            <td>{{ item.count }}</td>
            <td>{{ item.width }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxLength: {
      type: Number,
      default: 0,
    },
    expandedMaxLength: {
      type: Number,
      default: 0,
    },
    characterSummary: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
