import { check_login, get_access_token } from "./auth.js";
import { displayModal } from "./modal.js";
const btn_shoppingcart = document.querySelector("#btn-shoppingcart");

btn_shoppingcart.addEventListener("click", (e) => {
  e.preventDefault();
  const access_token = get_access_token();
  if (access_token === null) {
    // 로그인 모달 띄우기
    displayModal();
    return;
  }

  check_login("cart")
    .then((state) => {
      if (state) {
        location.href = "./shoppingcart";
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      displayModal();
    });
});
