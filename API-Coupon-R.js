const WooCommerceAPI = require("woocommerce-api");
const consumerKey = "ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54";
const consumerSecret = "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01";
const storeUrl = "http://localhost/shop";

const WooCommerce = new WooCommerceAPI({
  url: storeUrl,
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  wpAPI: true,
  version: "wc/v3",
});

WooCommerce.get(`coupons`, function (err, data, res) {
  if (err) {
    console.log(err);
    return;
  }
  const coupons = JSON.parse(res);
  console.log("-----------------------------------");
  console.log("List of coupons");
  console.log("-----------------------------------");
  coupons.forEach((coupon) => {
    console.log("Coupon id:", coupon.id);
    console.log("Coupon code:", coupon.code);
    console.log("Discount type:", coupon.discount_type);
    console.log("Amount:", coupon.amount);
    console.log("Usage limit:", coupon.usage_limit);
    console.log("Usage limit per user:", coupon.usage_limit_per_user);
    console.log("-----------------------------------");
  });
});
