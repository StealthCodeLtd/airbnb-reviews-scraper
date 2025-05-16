const { getApiKey } = require("./api");
const { getReviews } = require("./reviews");
const fs = require("fs");

async function fetchReviewsForProperty(propertyId) {
  try {
    const userProxy = null;
    const apiKey = await getApiKey(userProxy);
    const reviews = await getReviews({
      apiKey,
      productId: propertyId,
      proxyUrl: userProxy,
    });
    return reviews;
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    if (err.response) {
      console.error("DEBUG: Response status:", err.response.status);
      console.error(
        "DEBUG: Response data:",
        JSON.stringify(err.response.data, null, 2)
      );
    }
    return null;
  }
}

if (require.main === module) {
  const propertyId = process.argv[2];
  if (!propertyId) {
    console.error("Usage: node index.js <propertyId>");
    process.exit(1);
  }
  fetchReviewsForProperty(propertyId).then((reviews) => {
    if (reviews.length > 0) {
      const output = JSON.stringify(reviews, null, 2);
      console.log(output);
      fs.writeFileSync(`reviews_${propertyId}.txt`, output, "utf8");
      console.log(`Reviews saved to reviews_${propertyId}.txt`);
    } else {
      console.log("No reviews found or error occurred.");
    }
  });
}

module.exports = { fetchReviewsForProperty };
