import Image_slider from "./image_slider.js";
const htmlElement = document.documentElement;
const product_list_container = document.querySelector(
  ".product-list-container"
);
const btn_prev = document.querySelector(".btn-prev-slider");
const btn_next = document.querySelector(".btn-next-slider");

const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
let product = [];

/* async function loadDetail() {
  try {
    const res = await fetch("/src/html/detail.html");
    console.log(res);
    if (!res.ok) {
      throw new Error("Network Error");
    }
    const htmltext = await res.text();
    return htmltext;
  } catch (error) {
    console.error(error);
  }
} */

async function getProduct() {
  try {
    const response = await fetch(`${BASE_URL}/products/`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

function createProduct(product) {
  if (product.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < product.length; i++) {
    const article = document.createElement("article");
    article.className = "product-item";
    article.innerHTML = `
    <a class="product-link" href="./detail">
      <img src="${product[i].image}" alt=""/>
      <p class="store-name">${product[i].seller.store_name}</p>
      <p class="product-name">${product[i].name}</p>
      <p class="product-price"><span>${product[
        i
      ].price.toLocaleString()}</span>원</p>
      </a> 
    `;

    /*    const link = article.querySelector(".product-link");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = product[i].id;
      loadDetail().then((detailHTML) => {
        if (detailHTML) {
          htmlElement.innerHTML = detailHTML;

          // Manually re-load any scripts needed
          const script = document.createElement("script");
          script.src = "/src/js/detail.js"; // The JavaScript file you need
          script.onload = () => {
            console.log("Script loaded successfully!");
            // Initialize any functionality here if needed
          };
          document.body.appendChild(script);
        }
      });
      history.pushState(null, "", `/detail/${productId}`);
    }); */
    fragment.append(article);
  }

  product_list_container.append(fragment);
}
getProduct().then((res) => {
  product = res.results;
  createProduct(product);
  const slider = new Image_slider(product);

  btn_next.addEventListener("click", () => {
    slider.move_slide("next");
  });

  // prev 버튼 이벤트 리스너 등록
  btn_prev.addEventListener("click", () => {
    slider.move_slide("prev");
  });
});
