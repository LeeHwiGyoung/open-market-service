import { get_fetch } from "../utils/fetch.js";
import Image_slider from "./image_slider.js";
const main = document.querySelector("main");
const product_list_container = document.querySelector(
  ".product-list-container"
);
const btn_prev = document.querySelector(".btn-prev-slider");
const btn_next = document.querySelector(".btn-next-slider");

const products = [];

function createProduct(product) {
  if (product.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < product.length; i++) {
    const article = document.createElement("article");
    article.className = "product-item";
    article.innerHTML = `
    <a class="product-link" href="/src/html/detail.html?id=${product[i].id}">
      <img src="${product[i].image}" alt=""/>
      <p class="store-name">${product[i].seller.store_name}</p>
      <p class="product-name">${product[i].name}</p>
      <p class="product-price"><span>${product[
        i
      ].price.toLocaleString()}</span>원</p>
      </a> 
    `;

    fragment.append(article);
  }
  product_list_container.append(fragment);
}

async function init() {
  const json = await get_fetch("products");
  products.push(...json.results);
  createProduct(products);
  const slider = new Image_slider(products);
  btn_next.addEventListener("click", () => {
    slider.move_slide("next");
  });
  btn_prev.addEventListener("click", () => {
    slider.move_slide("prev");
  });
}

init();
