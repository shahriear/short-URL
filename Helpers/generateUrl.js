const generateShortID = () => {
  const patternCharecter =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  let shortID = '';
  // Generate a 6-character long random ID
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * patternCharecter.length);
    shortID += patternCharecter[randomIndex];
  }
  return shortID;
};

module.exports = generateShortID;
