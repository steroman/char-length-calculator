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

      <h3>Localization Expansion Rates:</h3>
      <table>
        <thead>
          <tr>
            <th>Language</th>
            <th>Average Length</th>
            <th>Expansion Rate (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sortedExpansionRates" :key="index">
            <td>{{ item.code }}</td>
            <td>{{ item.avgLocalizedLength.toFixed(2) }}</td>
            <td>{{ (item.expansionRate * 100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxLength: Number,
    expandedMaxLength: Number,
    characterSummary: Array,
    sortedExpansionRates: Array,
  },
};
</script>
