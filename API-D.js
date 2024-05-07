const axios = require('axios');

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = 'ck_45bb462004400530d0582cba87f44f11a02b2938';
const consumerSecret = "cs_c14a083651f7c5949376abdcc35ff97fb573a2b4";
const storeUrl = 'http://localhost/wordpress';

// Define the authentication headers
const headers = {
    Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
    'Content-Type': 'application/json'
};

// Send a DELETE request to delete a product
axios.delete(`${storeUrl}/wp-json/wc/v3/products/4118`, { headers })
    .then(response => {
        // If the request was successful, display a success message
        console.log('Product deleted successfully');
    })
    .catch(error => {
        // If there was an error, display the error message
        console.error('Failed to delete product:', error.response.data);
    });
