const WooCommerceAPI = require('woocommerce-api');

// Khai báo thông tin xác thực và URL của cửa hàng WooCommerce
const consumerKey = 'ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54';
const consumerSecret = 'cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01';
const storeUrl = 'http://localhost/shop';

// Khởi tạo đối tượng WooCommerceAPI
const WooCommerce = new WooCommerceAPI({
    url: storeUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    wpAPI: true,
    version: 'wc/v3'
});


const couponId = 1849;
WooCommerce.delete(`coupons/${couponId}`, function (err, data, res) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Coupon deleted with id:', couponId);
});
