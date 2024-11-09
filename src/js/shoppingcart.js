import { auth_get_fetch } from "../utils/fetch.js";
import { check_login, get_access_token } from "../utils/auth.js";
import { displayLoginModal } from "./login_modal.js";
import Shoppingcart_list from "./shoppingcart_list.js";
import selectedcartItemList from "./selectedCartItem.js";

const shoppingcart_container = document.querySelector(
  ".shoppingcart-container"
);

const shoppingcart_menu =
  shoppingcart_container.querySelector(".shoppingcart-menu");

const btn_select_all = shoppingcart_menu.querySelector("#select-all");

const cart_list = { item: null };

async function get_shoppingcart() {
  const access_token = get_access_token();
  const json = await auth_get_fetch("cart", access_token);
  return json;
}

async function init() {
  const access_token = get_access_token();
  if (access_token === null) {
  }

  const state = await check_login("cart");

  if (!state) {
    displayLoginModal();
  }

  const item = await get_shoppingcart();
  cart_list.item = new Shoppingcart_list(item.results);
  selectedcartItemList.clearCartList();
}

btn_select_all.addEventListener("click", (e) => {
  e.target.checked
    ? cart_list.item.select_all()
    : cart_list.item.unselect_all();
  cart_list.item.calc_total_price();
  cart_list.item.display_order_fee();
});

init();
