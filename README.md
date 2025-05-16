# airbnb-reviews-scraper

A Node.js tool to fetch all reviews for a given Airbnb property.

## Features
- Scrapes all reviews for a specified Airbnb listing.
- Supports optional proxy configuration.
- Saves reviews to a text file named `reviews_<propertyId>.txt` after fetching.

## Requirements
- Node.js v14 or higher

## Installation
1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
Run the scraper from the command line, providing the Airbnb property ID:

```bash
    node index.js <propertyId>
```

- Replace `<propertyId>` with the numeric ID of the Airbnb listing (found in the listing URL).
- Example:
  ```powershell
  node index.js 12345678
  ```

### With Proxy (Optional)
To use a proxy, set your proxy URL in `userProxy` variable in `index.js`.

## Output
- The script prints the reviews as a JSON array to the console.
- The reviews are also saved to a file named `reviews_<propertyId>.txt` in the project directory.

