const WooCommerceAPI = require("woocommerce-api");

// Enter your WooCommerce API credentials and the URL of your store
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

const couponId = 1849;

const couponData = {
  code: "CONGDIEMCONGDIEMCONGDIEMTHAYOIIIII",
  discount_type: "percent",
  amount: "50",
  individual_use: false,
  exclude_sale_items: true,
  usage_limit: 50,
  usage_limit_per_user: 1,
};

// Update the product
WooCommerce.put(`coupons/${couponId}`, couponData, function (err, data, res) {
  if (err) {
    console.log(err);
    return;
  }

  const couponAfterUpdate = JSON.parse(res);
  console.log("-----------------------------------");
  console.log("COUPON ĐÃ ĐƯỢC CẬP NHẬT MONG THẦY CỘNG ĐIỂM Ạ!!");
  console.log("-----------------------------------");
  console.log("Coupon id:", couponAfterUpdate.id);
  console.log("Coupon code:", couponAfterUpdate.code);
  console.log("Discount type:", couponAfterUpdate.discount_type);
  console.log("Amount:", couponAfterUpdate.amount);
  console.log("Usage limit:", couponAfterUpdate.usage_limit);
  console.log("Usage limit per user:", couponAfterUpdate.usage_limit_per_user);
  console.log("-----------------------------------");
});
