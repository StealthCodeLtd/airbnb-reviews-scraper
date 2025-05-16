function removeSpace(value) {
  return value.trim().replace(/[\s\u00A0]+/g, " ");
}

function getNestedValue(obj, keyPath, defaultValue = null) {
  const keys = keyPath.split(".");
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  return current;
}

function parsePriceSymbol(priceRaw) {
  priceRaw = priceRaw.replace(/,/g, "");
  const priceNumberMatch = priceRaw.match(/\d+/);
  if (!priceNumberMatch) return [0, ""];
  const priceNumber = priceNumberMatch[0];
  let priceCurrency = priceRaw.replace(priceNumber, "").replace(/ |-/g, "");
  let priceConverted = parseFloat(priceNumber);
  if (priceRaw.startsWith("-")) priceConverted *= -1;
  return [priceConverted, priceCurrency];
}

function parseProxy(ipOrDomain, port, username, password) {
  const encodedUsername = encodeURIComponent(username);
  const encodedPassword = encodeURIComponent(password);
  return `http://${encodedUsername}:${encodedPassword}@${ipOrDomain}:${port}`;
}

module.exports = {
  removeSpace,
  getNestedValue,
  parsePriceSymbol,
  parseProxy,
};
