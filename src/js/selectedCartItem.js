function selectedCartItem() {
  const selectItem = new Set(
    JSON.parse(sessionStorage.getItem("cartItems")) || []
  );

  return {
    addItem(id) {
      selectItem.add(id);
      sessionStorage.setItem("cartItems", JSON.stringify([...selectItem]));
    },

    removeItem(id) {
      selectItem.delete(id);
      sessionStorage.setItem("cartItems", JSON.stringify([...selectItem]));
    },

    has(id) {
      return selectItem.has(id);
    },

    clearCartList() {
      selectItem.clear();
      sessionStorage.removeItem("cartItems");
    },

    getCartList() {
      return [...selectItem];
    },
  };
}

const selectedcartItemList = selectedCartItem();

export default selectedcartItemList;
