const WooCommerceAPI = require('woocommerce-api');

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = 'ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54';
const consumerSecret = "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01";
const storeUrl = 'http://localhost/shop';

const WooCommerce = new WooCommerceAPI({
    url: storeUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    wpAPI: true,
    version: 'wc/v3'
});

const couponData = {
    code: 'CONGDIEMANHTUNGOI',
    discount_type: 'percent',
    amount: '2',
    individual_use: false,
    exclude_sale_items: true, 
    usage_limit: 100,
    usage_limit_per_user: 4,
};

function createCoupon() {
    WooCommerce.post('coupons', couponData, function (err, data, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Coupon published:', JSON.parse(res));
    });
}

const publishDate = new Date('2024-05-10T14:30:50'); 
const currentDate = new Date();

if (publishDate > currentDate) {
    const timeUntilPublish = publishDate.getTime() - currentDate.getTime();
    console.log(`Coupon will be published in ${timeUntilPublish / 1000} seconds`);
    setTimeout(createCoupon, timeUntilPublish);
} else {
    console.log('Publish date is in the past. Coupon will not be published.');
}