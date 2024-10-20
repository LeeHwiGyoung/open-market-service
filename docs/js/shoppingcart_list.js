const shoppingcart_container = document.querySelector(
  ".shoppingcart-container"
);

class Shoppingcart_list {
  constructor(item) {
    this.item = item;
    this.make();
  }

  make() {
    console.log(this.item);
    if (this.item.length === 0) {
      const section = document.createElement("section");
      section.className = "shoppingcart-item-none-wrap";
      section.innerHTML = `<strong> 장바구니에 담긴 상품이 없습니다.</strong><p>원하는 상품을 장바구니에 담아보세요!</p>`;
      shoppingcart_container.append(section);
      return;
    }

    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.className = "shoppingcart-list";
    this.item.forEach((item) => {
      const li = document.createElement("li");
      li.className = "shoppingcart-item";
      li.dataset.id = item.id;
      li.innerHTML = ` <button class="btn-shoppingcart-check" type="button"></button>
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
          src="../assets/images/icon-minus-line.svg"
          alt="수량 마이너스 버튼"
        />
      </button>
      <label class="sr-only" for="product-quantity">선택된 수량</label>
      <input
        type="text"
        name="product-quantity"
        id="product-quantity"
        class="input-product-quantity"
        min="1"
        value="${item.quantity}"
        readonly
      />
      <button class="btn-quantity" data-type="plus" type="button">
        <img
          src="../assets/images/icon-plus-line.svg"
          alt="수량 플러스 버튼"
        />
      </button>
    </div>
    <div class="product-price-info-container">
      <p>17500원</p>
      <a class="btn-order" herf="#">주문하기</a>
    </div>`;
      ul.append(li);
    });
    fragment.append(ul);
    const section = document.createElement("section");
    section.className = "order-amount-container";
    section.innerHTML = `<h2 class="sr-only">선택된 상품 금액 정보</h2>
      <div class="total-price-wrap">
      <p>총 상품금액</p>
      <p><span>46,500</span>원</p>
      </div>
      <img src="../assets/images/icon-minus.svg" alt="할인 가격 빼기" />
      <div class="price-discount-wrap">
      <p>상품 할인</p>
      <p><span>0</span>원</p>
      </div>
      <img src="../assets/images/icon-plus.svg" alt="배달비 더하기" />
      <div class="price-delivery-wrap">
      <p>배송비</p>
      <p><span>0</span>원</p>
      </div>
      <div class="expected-price-wrap">
      <p>결제 예정 금액</p>
      <p><span>46,500</span>원</p>
      </div>`;
    fragment.append(section);
    const order_link = document.createElement("a");
    order_link.className = "btn-total-order";
    order_link.href = "#";
    order_link.textContent = "주문하기";
    fragment.append(order_link);
    shoppingcart_container.append(fragment);
  }
}

export default Shoppingcart_list;
