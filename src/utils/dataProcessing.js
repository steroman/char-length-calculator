export function cleanAndCountCharacters(dataset, options = {}) {
  console.log("Processing dataset with cleanup options:", options);

  const {
    ignorePunctuation = false,
    ignoreCapitals = false,
    ignoreNumbers = false,
  } = options;

  let text = Object.values(dataset).join("");

  // Apply cleanup based on options
  if (ignorePunctuation) {
    const punctuationRegex = /[%´`\-.?{}|\\’ʼ“"”:,!]/g;
    text = text.replace(punctuationRegex, '');
  }
  if (ignoreNumbers) {
    text = text.replace(/[0-9]/g, '');
  }
  if (ignoreCapitals) {
    text = text.toLowerCase();
  }

  // Calculate character counts
  const characterCounts = {};
  for (const char of text) {
    characterCounts[char] = (characterCounts[char] || 0) + 1;
  }

  const totalCharacters = text.length;
  // Calculate frequencies and return as required object format
  const characterFrequencies = Object.fromEntries(
    Object.entries(characterCounts).map(([char, count]) => [
      char,
      { count, frequency: count / totalCharacters }
    ])
  );

  console.log("Character frequencies calculated:", characterFrequencies);
  return characterFrequencies;
}
// export function cleanAndCountCharacters(dataset, options = {}) {
//   const {
//     ignorePunctuation = false,
//     ignoreCapitals = false,
//     ignoreNumbers = false,
//   } = options;

//   let text = Object.values(dataset).join("");

//   // Apply cleanup based on options
//   if (ignorePunctuation) {
//     const punctuationRegex = /[%´`\-.?{}|\\’ʼ“"”:,!]/g;
//     text = text.replace(punctuationRegex, '');
//   }
//   if (ignoreNumbers) {
//     text = text.replace(/[0-9]/g, '');
//   }
//   if (ignoreCapitals) {
//     text = text.toLowerCase();
//   }

//   // Calculate character counts
//   const characterCounts = {};
//   for (const char of text) {
//     characterCounts[char] = (characterCounts[char] || 0) + 1;
//   }

//   const totalCharacters = text.length;
//   // Calculate frequencies and sort alphabetically
//   const characterFrequencies = Object.fromEntries(
//     Object.entries(characterCounts).map(([char, count]) => [
//       char,
//       { count, frequency: count / totalCharacters }
//     ])
//   );

//   return characterFrequencies;
// }

// export function cleanAndCountCharacters(dataset, options) {
//     // Merge all text values in the dataset into one string
//     let text = Object.values(dataset).join('');
    
//     // Apply cleanup options
//     if (options.ignorePunctuation) {
//       const punctuation = /[%´`\-.?{}|\\’ʼ“"”:,!]/g;
//       text = text.replace(punctuation, '');
//     }
//     if (options.ignoreNumbers) {
//       text = text.replace(/[0-9]/g, '');
//     }
//     if (options.ignoreCapitals) {
//       text = text.toLowerCase();
//     }
  
//     // Count each character's frequency
//     const characterCounts = {};
//     for (const char of text) {
//       characterCounts[char] = (characterCounts[char] || 0) + 1;
//     }
  
//     // Calculate frequencies
//     const totalCharacters = text.length;
//     const sortedCharacterFrequencies = Object.entries(characterCounts)
//     .sort(([a], [b]) => a.localeCompare(b))
//     .reduce((acc, [char, count]) => {
//       acc[char] = { count, frequency: count / totalCharacters };
//       return acc;
//     }, {});
//   return sortedCharacterFrequencies

//   }
  
  // export function calculateAverageWidth(widths, processedData) {
  //   let totalWidth = 0;
  //   let totalFrequency = 0;
  
  //   for (const [char, data] of Object.entries(processedData)) {
  //     const charWidth = widths[char] || 0; // Default to 0 if width is not provided
  //     totalWidth += charWidth * data.frequency;
  //     totalFrequency += data.frequency;
  //   }
  
  //   return totalFrequency > 0 ? totalWidth / totalFrequency : 0; // Avoid division by zero
  // }

  export function calculateAverageWidth(characterWidths, processedData) {
    let totalWidth = 0;
    let totalFrequency = 0;
  
    for (const char in processedData) {
      const charData = processedData[char];
      const width = characterWidths[char] || 0;
  
      totalWidth += width * charData.frequency;
      totalFrequency += charData.frequency;
    }
  
    if (totalFrequency === 0) return 0; // Prevent division by zero
    return totalWidth / totalFrequency;
  }