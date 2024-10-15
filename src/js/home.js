const product_list_container = document.querySelector(
  ".product-list-container"
);
const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
let product = [];

async function getProduct() {
  try {
    const response = await fetch(`${BASE_URL}/products/`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

/* 
<article class="product-item">
  <a href="/src/html/detail.html">
    <img src="" alt="프로덕트 이미지" />
    <p>판매처</p>
    <h2>상품명</h2>
    <p>가격</p>
  </a>
</article>; */
function createProduct(product) {
  if (product.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < product.length; i++) {
    const article = document.createElement("article");
    article.className = "product-item";
    article.innerHTML = `
    <a href="/src/html/detail.html/">
      <img src="${product[i].image}" alt=""/>
      <p class="store-name">${product[i].seller.store_name}</p>
      <p class="product-name">${product[i].name}</p>
      <p class="product-price"><span>${product[
        i
      ].price.toLocaleString()}</span>원</p> 
    `;
    fragment.prepend(article);
  }
  product_list_container.append(fragment);
}
getProduct().then((res) => {
  product = res.results;
  createProduct(product);
  console.log(product);
});
