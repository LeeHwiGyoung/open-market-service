import { displayDeleteModal, setTargetElement } from "./delete_modal.js";
import { displayModifyModal, setModifyTargetItem } from "./modify_modal.js";
import selectedcartItemList from "./selectedCartItem.js";
const shoppingcart_container = document.querySelector(
  ".shoppingcart-container"
);

const order_cotainer = shoppingcart_container.querySelector(
  ".order-amount-container"
);

const total_price = order_cotainer.querySelector(".total-price");
const total_delivery_fee = order_cotainer.querySelector(".total-delivery-fee");
const total_discount = order_cotainer.querySelector(".total-discount");
const total_order_fee = order_cotainer.querySelector(".order-fee");

class Shoppingcart_list {
  constructor(items) {
    this.items = items;
    this.order_fee = 0;
    this.total_price = 0;
    this.total_delivery_fee = 0;
    this.total_discount = 0;
    this.make();
  }

  make() {
    if (this.items.length === 0) {
      const section = document.createElement("section");
      section.className = "shoppingcart-item-none-wrap";
      section.innerHTML = `<strong> 장바구니에 담긴 상품이 없습니다.</strong><p>원하는 상품을 장바구니에 담아보세요!</p>`;
      shoppingcart_container.insertBefore(section, order_cotainer);
      return;
    }

    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.className = "shoppingcart-list";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "shoppingcart-item";
      li.dataset.id = item.id;
      li.innerHTML = ` 
      <button class="btn-remove" type="button">
        <img src="/assets/images/icon-delete.svg" alt="삭제 버튼">
      </button>
      <label for="check-${item.id}" class='btn-shoppingcart-check'></label>
      <input id="check-${item.id}"class="sr-only" type="checkbox"/>
      <div class="product-info-container">
        <img src="${item.product.image}" alt="상품 이미지" />
        <div>
          <p class="store-name">${item.product.seller.store_name}</p>
          <p class="product-name">${item.product.name}</p>
          <p class="product-price">
            <span>${item.product.price.toLocaleString()}</span>원
          </p>
          <p class="product-delivery">택배배송 / 무료배송</p>
        </div>
      </div>
      <div class="product-quantity-container">
        <button class="btn-quantity" data-type="minus" type="button">
          <img
            src="/assets/images/icon-minus-line.svg"
            alt="수량 마이너스 버튼"
          />
        </button>
        <label class="sr-only" for="product-quantity-${
          item.id
        }">선택된 수량</label>
        <input
          style= "width:calc(${item.quantity.toString().length}ch + 4.3rem)"
          type="text"
          name="product-quantity"
          id="product-quantity-${item.id}"
          data-id="${item.id}"
          class="input-product-quantity"
          min="1"
          value="${item.quantity}"
          readonly
        />
        <button class="btn-quantity" data-type="plus" type="button">
          <img
            src="/assets/images/icon-plus-line.svg"
            alt="수량 플러스 버튼"
          />
        </button>
      </div>
      <div class="product-price-info-container">
        <p>${item.product.price.toLocaleString()}원</p>
        <a class="btn-order" href="./payment.html">주문하기</a>
      </div>`;
      const qunatity_input = li.querySelector(".input-product-quantity");
      const btn_check = li.querySelector("input[type='checkbox']");
      const product_quantity_container = li.querySelector(
        ".product-quantity-container"
      );
      const btn_remove_shoppingcart_item = li.querySelector(".btn-remove");
      this.click_del_btn(btn_remove_shoppingcart_item);
      this.click_quantity(product_quantity_container);
      this.click_btn_check(btn_check);
      this.change_input_value(qunatity_input);
      ul.append(li);
    });

    fragment.append(ul);
    shoppingcart_container.insertBefore(fragment, order_cotainer);
  }

  change_input_value(context) {
    context.addEventListener("change", (e) => {
      console.log(this.items);
      const newQuantity = e.target.value;
      e.target.style.width = `calc(${
        newQuantity.toString().length
      }ch + 4.3rem)`;

      const item = this.items.find(
        (item) => item.id === parseInt(e.target.dataset.id)
      );
      if (item && !isNaN(newQuantity) && newQuantity > 0) {
        item.quantity = newQuantity;
        this.calc_total_price();
        this.display_order_fee();
      }
    });
  }

  click_del_btn(context) {
    context.addEventListener("click", (e) => {
      displayDeleteModal();
      setTargetElement(context);
    });
  }

  click_quantity(context) {
    context.addEventListener("click", (e) => {
      if (e.target.closest("BUTTON")) {
        displayModifyModal();
        setModifyTargetItem(context);
      }
    });
  }

  click_btn_check(context) {
    context.addEventListener("click", (e) => {
      const id = parseInt(e.target.parentNode.dataset.id);
      e.target.checked
        ? selectedcartItemList.addItem(id)
        : selectedcartItemList.removeItem(id);
      this.calc_total_price();
      this.display_order_fee();
    });
  }

  select_all() {
    const inputs = shoppingcart_container.querySelectorAll(
      "input[type='checkbox']"
    );
    inputs.forEach((input) => {
      input.checked = true;
    });
    this.items.forEach((item) => selectedcartItemList.addItem(item.id));
  }

  unselect_all() {
    const inputs = shoppingcart_container.querySelectorAll(
      "input[type='checkbox']"
    );
    inputs.forEach((input) => {
      input.checked = false;
    });
    selectedcartItemList.clearCartList();
  }

  display_order_fee() {
    total_price.textContent = this.total_price;
    total_delivery_fee.textContent = this.total_delivery_fee;
    total_discount.textContent = this.total_discount;
    total_order_fee.textContent = this.order_fee;
  }

  calc_total_price() {
    let total_price = 0;
    let total_discount = 0;
    let total_delivery_fee = 0;
    let order_fee = 0;
    this.items.forEach((item) => {
      if (selectedcartItemList.has(item.id)) {
        total_price += item.product.price * item.quantity;
        total_delivery_fee += item.product.shipping_fee;
      }
    });

    order_fee = total_price + total_delivery_fee - total_discount;

    this.total_price = total_price;
    this.total_delivery_fee = total_delivery_fee;
    this.total_discount = total_discount;
    this.order_fee = order_fee;
  }
}

export default Shoppingcart_list;
