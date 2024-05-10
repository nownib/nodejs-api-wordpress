const axios = require("axios");

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = "ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54";
const consumerSecret = "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01";
const storeUrl = "http://localhost/shop";

// Define the authentication headers
const headers = {
  Authorization: `Basic ${Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64")}`,
  "Content-Type": "application/json",    

  
};

// Get list of products from WooCommerce
axios
  .get(`${storeUrl}/wp-json/wc/v3/products`, {
    headers,
    params: {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      // categories: [{ id: 15 }],
      stock_status: "outofstock",
      per_page: 3,
    },
  })
  .then((response) => {
    const products = response.data;
    console.log("Checking out of stock products...", products.length); 

    products.forEach((product) => {
      axios
        .delete(`${storeUrl}/wp-json/wc/v3/products/${product.id}`, { headers })
        .then((response) => {
          console.log(`Deleted out of stock product: ${product.name}`);
        })
        .catch((error) => {
          console.error(
            `Failed to delete out of stock product: ${product.name}`,
            error.response.data
          );
        });
    });
  })
  .catch((error) => {
    console.error(
      "Failed to fetch out of stock products:",
      error.response.data
    );
  });
