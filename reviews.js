const axios = require("axios");
const { URLSearchParams } = require("url");
const utils = require("./utils");

const ep =
  "https://www.airbnb.com/api/v3/StaysPdpReviewsQuery/dec1c8061483e78373602047450322fd474e79ba9afa8d3dbbc27f504030f91d/";

async function getReviews({
  apiKey = "",
  productId = "",
  currency = "USD",
  language = "en",
  proxyUrl = null,
}) {
  const globalId = Buffer.from(`StayListing:${productId}`).toString("base64");
  let offset = 0;
  let allReviews = [];
  while (true) {
    const reviews = await getFromOffset({
      apiKey,
      offset,
      productId: globalId,
      currency,
      language,
      proxyUrl,
    });
    offset += 50;
    if (!reviews || reviews.length === 0) break;
    allReviews = allReviews.concat(reviews);
  }
  return allReviews;
}

async function getFromOffset({
  apiKey,
  offset,
  productId,
  currency = "USD",
  language = "en",
  proxyUrl = null,
}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Airbnb-Api-Key": apiKey,
  };
  const variablesData = {
    id: productId,
    pdpReviewsRequest: {
      fieldSelector: "for_p3_translation_only",
      forPreview: false,
      limit: 50,
      offset: String(offset),
      showingTranslationButton: false,
      first: 50,
      sortingPreference: "MOST_RECENT",
      numberOfAdults: "1",
      numberOfChildren: "0",
      numberOfInfants: "0",
      numberOfPets: "0",
      after: null,
    },
  };
  const extension = {
    persistedQuery: {
      version: 1,
      sha256Hash:
        "dec1c8061483e78373602047450322fd474e79ba9afa8d3dbbc27f504030f91d",
    },
  };
  const query = new URLSearchParams({
    operationName: "StaysPdpReviewsQuery",
    locale: language,
    currency: currency,
    variables: JSON.stringify(variablesData),
    extensions: JSON.stringify(extension),
  });
  const url = `${ep}?${query.toString()}`;
  let axiosConfig = { headers, timeout: 60000 };
  if (proxyUrl) {
    const ProxyAgent = require("proxy-agent");
    axiosConfig.httpAgent = new ProxyAgent(proxyUrl);
    axiosConfig.httpsAgent = new ProxyAgent(proxyUrl);
  }
  const response = await axios.get(url, axiosConfig);
  const data = response.data;
  const reviews = utils.getNestedValue(
    data,
    "data.presentation.stayProductDetailPage.reviews.reviews",
    []
  );
  return reviews;
}

module.exports = { getReviews, getFromOffset };
