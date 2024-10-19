import { get_access_token, login_with_token } from "./auth.js";

const btn_shoppingcart = document.querySelector("#btn-shoppingcart");
btn_shoppingcart.addEventListener("click", (e) => {
  e.preventDefault();
  const access_token = get_access_token();

  if (access_token === null) {
    // 로그인 모달 띄우기
    return;
  }
  login_with_token("/cart");
  location.href = "/src/html/shoppingcart.html";
});
