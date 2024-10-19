const slider_container = document.querySelector(".product-slider-container");
const slider_list = slider_container.querySelector(".product-slider-list");
const product_list = [];

class Image_slider {
  constructor(products) {
    this.products = products;
    this.create_product_item();
    this.create_product_indicator();
    this.changeSliderWidth(slider_list);
    this.idx = 0;
    this.update_slider_position();
  }

  changeSliderWidth(context) {
    context.style.width = `${this.products.length * 100}%`;
  }

  create_product_item() {
    const fragment = document.createDocumentFragment();
    this.products.forEach((product) => {
      const li = document.createElement("li");
      li.className = "product-slider-item";
      li.innerHTML = `<a href=./detail?id=${product.id}><img src="${product.image}" alt=""/></a>`;
      fragment.append(li);
    });
    slider_list.append(fragment);
  }

  create_product_indicator() {
    const fragment = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.className = "slider-item-indicator";
    for (let i = 0; i < this.products.length; i++) {
      const li = document.createElement("li");
      li.dataset.index = i;
      ul.appendChild(li);
    }
    fragment.append(ul);
    slider_container.append(fragment);
  }

  move_slide(direction) {
    if (direction === "next") {
      this.idx = (this.idx + 1) % this.products.length;
    } else if (direction === "prev") {
      this.idx = (this.idx - 1 + this.products.length) % this.products.length;
    }
    this.update_slider_position();
  }

  // 슬라이더의 위치 업데이트 메서드
  update_slider_position() {
    slider_list.style.transform = `translateX(-${
      (this.idx * 100) / this.products.length
    }%)`;
  }
}

export default Image_slider;
