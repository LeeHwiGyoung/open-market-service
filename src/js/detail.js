const url = location.pathname;
//const product_id = url.match(/detail\/(\d+)/)[1];
const product_id = 1;
const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
const detail_contanier = document.querySelector(
  ".product-detail-price-container"
);
const product_img = detail_contanier.querySelector(".img-product");
const store_name = detail_contanier.querySelector(".store-name");
const product_name = detail_contanier.querySelector(".product-name");
const product_price = detail_contanier.querySelector(".product-price");
const input_product_quantity = detail_contanier.querySelector(
  ".input-product-quantity"
);
const btn_quantity_minus = detail_contanier.querySelector(".minus");
const btn_quantity_plus = detail_contanier.querySelector(".plus");
const total_quantity = detail_contanier.querySelector(".total-quantity");
const total_price = detail_contanier.querySelector(".total-price");
let product = [];

async function getDetail() {
  const res = await fetch(`${BASE_URL}/products/${product_id}`);
  const json = await res.json();
  return json;
}

function setDetail(product) {
  product_img.setAttribute("src", `${product.image}`);
  store_name.textContent = product.seller.store_name;
  product_name.textContent = product.name;
  product_price.innerHTML = `<span>${product.price.toLocaleString()}</span>원`;
}

function calc_price(product_price) {
  const quantity = input_product_quantity.value;
  total_quantity.innerHTML = `총 수량 <span>${quantity}</span>개`;
  total_price.innerHTML = `<span>${(
    quantity * product_price
  ).toLocaleString()}</span>원`;
}

(async function () {
  product = await getDetail();
  setDetail(product);
  calc_price(product.price);
})();

btn_quantity_minus.addEventListener(())