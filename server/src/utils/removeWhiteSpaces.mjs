const removeWhiteSpaces = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].trim();
  }
  return array;
};
export default removeWhiteSpaces;
