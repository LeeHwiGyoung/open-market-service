import { get_access_token, check_login } from "./auth.js";
import { displayModal } from "./modal.js";
import { post_cart } from "./shoppingcart_utils.js";

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
const btn_quantity_wrap = detail_contanier.querySelector(
  ".product-quantity-wrap"
);
const total_quantity = detail_contanier.querySelector(".total-quantity");
const total_price = detail_contanier.querySelector(".total-price");
const btn_shopping_cart = detail_contanier.querySelector(".btn-shopping-cart");
const btn_buy = detail_contanier.querySelector(".btn-buy");

let product = {};
let quantity = 1;

async function getDetail(product_id) {
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
  total_quantity.innerHTML = `총 수량 <span>${quantity}</span>개`;
  total_price.innerHTML = `<span>${(
    quantity * product_price
  ).toLocaleString()}</span>원`;
}

function click_btn_quantity(e) {
  const button = e.target.closest("button"); // 클릭된 이미지의 부모 버튼을 찾음
  if (!button) return; // 버튼이 아니면 아무 작업도 하지 않음

  const type = button.dataset.type;
  if (type === "plus" && product.stock > quantity) {
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
    calc_price(product.price);
  },
  get() {
    return original_Descriptor.get.call(this); // 값을 반환
  },
});

btn_quantity_wrap.addEventListener("click", (e) => {
  click_btn_quantity(e);
});

btn_shopping_cart.addEventListener("click", (e) => {
  e.preventDefault();
  const access_token = get_access_token();

  if (access_token === null) {
    displayModal(); // 로그인 모달 띄우기
    return;
  }

  check_login("cart")
    .then((state) => {
      if (state) {
        if (product.stock === 0) {
          return new Error(alert("재고가 없습니다."));
        }
        post_cart(product.id, quantity, access_token);
        location.href = "/src/html/shoppingcart.html";
      } else {
        return new Error(displayModal());
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

btn_buy.addEventListener("click", (e) => {
  e.preventDefault();
  const access_token = get_access_token();
  if (access_token === null) {
    displayModal(); // 로그인 모달 띄우기
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
      displayModal();
    });
});

(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");

  product = await getDetail(product_id);
  setDetail(product);
  calc_price(product.price);
})();
