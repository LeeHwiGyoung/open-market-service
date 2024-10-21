import { auth_get_fetch } from "../utils/fetch.js";
import { check_login, get_access_token } from "../utils/auth.js";
import { displayModal } from "./modal.js";
import Shoppingcart_list from "./shoppingcart_list.js";

const shoppingcart_container = document.querySelector(
  ".shoppingcart-container"
);

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
    displayModal();
  }

  const item = await get_shoppingcart();
  cart_list.item = new Shoppingcart_list(item.results);
}

init();
