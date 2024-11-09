function selectedCartItem() {
  const selectItem = new Set();
  return {
    addItem(id) {
      selectItem.add(id);
    },

    removeItem(id) {
      selectItem.delete(id);
    },
    has(id) {
      return selectItem.has(id);
    },
    clearCartList() {
      selectItem.clear();
    },
    getCartList() {
      return [...selectItem];
    },
  };
}

const selectedcartItemList = selectedCartItem();

export default selectedcartItemList;
