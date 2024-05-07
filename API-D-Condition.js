const axios = require("axios");

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = "ck_45bb462004400530d0582cba87f44f11a02b2938";
const consumerSecret = "cs_c14a083651f7c5949376abdcc35ff97fb573a2b4";
const storeUrl = "http://localhost/wordpress";

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
      stock_status: "outofstock",
    //   per_page: 10,
    },
  })
  .then((response) => {
    const products = response.data;
    console.log("Checking out of stock products...", products.length); //Kiểm tra số lượng sản phẩm bị out stock
    // Duyệt qua từng sản phẩm và xóa sản phẩm hết hàng
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
