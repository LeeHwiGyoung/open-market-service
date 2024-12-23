import { get_access_token, check_login } from "../utils/auth.js";
import { auth_post_fetch, get_fetch } from "../utils/fetch.js";
import { displayLoginModal } from "./login_modal.js";

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
const btn_quantity_wrap = detail_contanier.querySelector(
  ".product-quantity-wrap"
);
const total_quantity = detail_contanier.querySelector(".total-quantity");
const total_price = detail_contanier.querySelector(".total-price");
const btn_shopping_cart = detail_contanier.querySelector(".btn-shopping-cart");
const btn_buy = detail_contanier.querySelector(".btn-buy");

let detail_product = { product: null };
let quantity = 1;

async function getDetail(product_id) {
  const json = await get_fetch(`products/${product_id}`);
  return json;
}

function setDetail(product) {
  product_img.setAttribute("src", `${product.image}`);
  store_name.textContent = product.seller.store_name;
  product_name.textContent = product.name;
  product_price.innerHTML = `<span>${product.price.toLocaleString()}</span>원`;
}

function calc_price(product_price) {
  total_quantity.innerHTML = `총 수량 <span>${quantity}</span>개`;
  total_price.innerHTML = `<span>${(
    quantity * product_price
  ).toLocaleString()}</span>원`;
}

function click_btn_quantity(e) {
  const button = e.target.closest("button"); // 클릭된 이미지의 부모 버튼을 찾음
  if (!button) return; // 버튼이 아니면 아무 작업도 하지 않음

  const type = button.dataset.type;
  if (type === "plus" && detail_product.product.stock > quantity) {
    quantity++;
  } else if (type === "minus" && quantity > 1) {
    quantity--;
  }

  input_product_quantity.value = quantity;
  input_product_quantity.style.width = `calc(${
    quantity.toString().length
  }ch + 4.2rem)`;
}

let original_value = input_product_quantity.value;
// value 속성의 setter를 재정의하여 값이 변경될 때마다 감지
const original_Descriptor = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  "value"
);

Object.defineProperty(input_product_quantity, "value", {
  set(new_value) {
    console.log("Value changed (by script or user):", new_value); // 값 변경 감지
    original_value = new_value; // 값을 업데이트
    original_Descriptor.set.call(this, new_value); // 실제로 값을 설정
    calc_price(detail_product.product.price);
  },
  get() {
    return original_Descriptor.get.call(this); // 값을 반환
  },
});

btn_quantity_wrap.addEventListener("click", (e) => {
  click_btn_quantity(e);
});

btn_shopping_cart.addEventListener("click", async (e) => {
  e.preventDefault();
  const access_token = get_access_token();

  if (access_token === null) {
    displayLoginModal(); // 로그인 모달 띄우기
    return;
  }
  const state = await check_login("cart");

  if (!state) {
    displayLoginModal();
    return;
  }

  if (detail_product.product.stock === 0) {
    alert("재고가 없습니다.");
    return;
  }

  await auth_post_fetch(
    "cart/",
    { product_id: detail_product.product.id, quantity: quantity },
    access_token
  );

  location.href = "/src/html/shoppingcart.html";
});

btn_buy.addEventListener("click", (e) => {
  e.preventDefault();
  const access_token = get_access_token();
  if (access_token === null) {
    displayLoginModal(); // 로그인 모달 띄우기
    return;
  }
  check_login("order")
    .then((state) => {
      if (state) {
        location.href = "#";
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      displayLoginModal();
    });
});

(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");

  detail_product.product = await getDetail(product_id);

  setDetail(detail_product.product);
  calc_price(detail_product.product.price);
})();
