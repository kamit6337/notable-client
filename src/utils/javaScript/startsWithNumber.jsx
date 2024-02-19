function startsWithNumber(str) {
  return /^\d/.test(str);
}

//   // Example usage:
//   console.log(startsWithNumber("012Sumit")); // Output: true
//   console.log(startsWithNumber("Sumit012")); // Output: false

export default startsWithNumber;
