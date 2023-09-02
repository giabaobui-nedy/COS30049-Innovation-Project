function shortenHexadecimal(hexString) {
    // Remove "0x" if it exists
  hexString = hexString.replace(/^0x/, '');

  // Parse the hexadecimal string to an integer
  const intValue = parseInt(hexString, 16);

  // Return the integer value
  return intValue;
}

export default shortenHexadecimal;