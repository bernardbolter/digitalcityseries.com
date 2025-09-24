export function toCamelCase(str) {
  // Split the string by spaces, hyphens, or underscores
  const words = str.split(/[\s_-]+/);

  // Take the first word and convert it to lowercase
  const firstWord = words[0].toLowerCase();

  // Process the rest of the words
  const restOfWords = words.slice(1).map(word => {
    // Capitalize the first letter of each subsequent word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join all parts together
  return firstWord + restOfWords.join('');
}