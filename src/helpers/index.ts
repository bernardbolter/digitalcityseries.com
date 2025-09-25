export function toCamelCase(str: string) {
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

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // Create a shallow copy to avoid mutating the original array
  let currentIndex = newArray.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}