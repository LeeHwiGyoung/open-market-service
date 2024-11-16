import { get_shoppingcart } from "../utils/shoppingcart_utils.js";
import selectedcartItemList from "./selectedCartItem.js";

const selectedCartItem = [];
const shoppingCart = { items: [] };
async function init() {
  const selectedId = [...selectedcartItemList.getCartList()];
  await get_shoppingcart().then(
    (res) => (shoppingCart.items = [...res.results])
  );

  selectedCartItem.push(
    ...shoppingCart.items.filter((item) => selectedId.includes(item.id))
  );
}

init();
