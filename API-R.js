const axios = require('axios');

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = 'ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54';
const consumerSecret = "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01";
const storeUrl = 'http://localhost/shop';

// Define the authentication headers
const headers = {
    Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
    'Content-Type': 'application/json'
};

// Send a GET request to read product details
axios.get(`${storeUrl}/wp-json/wc/v3/products/43`, { headers })
    .then(response => {
        // If the request was successful, display the product details
        console.log('Product Details:', response.data);
    })
    .catch(error => {
        // If there was an error, display the error message
        console.error('Failed to read product details:', error.response.data);
    });
