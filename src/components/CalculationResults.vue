<template>
    <div>
      <h2>Calculation Results</h2>
      <p>Max Length (without expansion): {{ maxLength }}</p>
      <p>Max Length (with expansion): {{ expandedMaxLength }}</p>
      <h3>Character Summary</h3>
      <ul>
        <li v-for="(data, char) in characterSummary" :key="char">
          {{ char }}: Frequency - {{ data.frequency }}%, Width - {{ data.width }}
        </li>
      </ul>
    </div>
  </template>
  