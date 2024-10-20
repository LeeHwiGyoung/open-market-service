import { check_login, get_access_token } from "./auth.js";
import { displayModal } from "./modal.js";
import Shoppingcart_list from "./shoppingcart_list.js";

const shoppingcart_container = document.querySelector(
  ".shoppingcart-container"
);
const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
let cart_item;

async function get_shoppingcart() {
  try {
    const access_token = get_access_token();
    const res = await fetch(`${BASE_URL}/cart/`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const json = await res.json();

    return json;
  } catch (error) {
    console.error(error);
  }
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
  cart_item = new Shoppingcart_list(item.results);
}

init();
