import {
  check_login,
  get_access_token,
  remove_access_token,
  remove_refresh_token,
} from "../utils/auth.js";

import { displayModal } from "./modal.js";
const btn_shoppingcart = document.querySelector("#btn-nav-shoppingcart");
const btn_login = document.querySelector("#btn-nav-login");
const dropdown_trigger = document.querySelector("#btn-nav-dropdown-trigger");
const dropdown_list = document.querySelector(".dropdown-list");
const btn_nav_logout = document.querySelector("#btn-nav-logout");

async function init() {
  const access_token = get_access_token();
  if (access_token !== null) {
    btn_login.classList.add("hide");
    dropdown_trigger.classList.remove("hide");
  } else {
    btn_login.classList.remove("hide");
    dropdown_trigger.classList.add("hide");
  }
}

btn_shoppingcart.addEventListener("click", async (e) => {
  e.preventDefault();
  const access_token = get_access_token();

  if (access_token === null) {
    // 로그인 모달 띄우기
    displayModal();
    return;
  }

  const state = await check_login("cart");

  if (!state) {
    displayModal();
  }
  location.href = "/src/html/shoppingcart.html";
});

dropdown_trigger.addEventListener("click", () => {
  dropdown_list.classList.toggle("active");
});

btn_nav_logout.addEventListener("click", () => {
  remove_access_token();
  remove_refresh_token();
  init();
});

init();
