import {
  getShoppingItem,
  updateShoppingItemQunantity,
} from "../utils/shoppingcart_utils.js";

const modifyModalContainer = document.querySelector(".modify-modal-container");
const dimd = modifyModalContainer.querySelector(".dimd");
const modifyModalContent = modifyModalContainer.querySelector(
  ".modal-modify-content"
);
const btnMinus = modifyModalContent.querySelector("#btn-minus");
const btnPlus = modifyModalContent.querySelector("#btn-plus");
const productQuantity = modifyModalContent.querySelector(
  ".input-product-quantity"
);
const btnCancle = modifyModalContainer.querySelector(".btn-cancle");
const modalBtnWrap = modifyModalContainer.querySelector(".modal-btn-wrap");
const btnNo = modalBtnWrap.querySelector(".btn-modal-no");
const btnYes = modalBtnWrap.querySelector(".btn-modal-yes");
const targetElement = {
  element: null,
};

const targetItemData = {
  id: -1,
  stock: -1,
  quantity: -1,
};

export const setModifyTargetItem = (context) => {
  //modal 과 shoppingItem을 mapping 해주는 함수
  const id = context.parentNode.dataset.id;
  targetElement.element = context;
  console.log(targetItemData);
  getShoppingItem("/cart/", id)
    .then((json) => {
      targetItemData.id = json.id;
      targetItemData.stock = json.product.stock;
      targetItemData.quantity = json.quantity;
      console.log("af", targetItemData);
    })
    .catch((err) => {
      removeModal();
    })
    .finally(() => {
      setInputValue();
    });
};

export const displayModifyModal = () => {
  modifyModalContainer.classList.add("active");
};

const removeModal = () => {
  modifyModalContainer.classList.remove("active");
};

const setInputValue = () => {
  productQuantity.setAttribute("value", targetItemData.quantity);
  productQuantity.style.width = `calc(${
    targetItemData.quantity.toString().length
  }ch + 4.3rem)`;
};
btnPlus.addEventListener("click", (e) => {
  if (targetItemData.quantity >= targetItemData.stock) {
    return;
  }
  targetItemData.quantity += 1;
  setInputValue();
});
btnMinus.addEventListener("click", (e) => {
  if (targetItemData.quantity <= 1) {
    return;
  }

  targetItemData.quantity -= 1;
  setInputValue();
});
dimd.addEventListener("click", () => removeModal());
btnCancle.addEventListener("click", () => removeModal());
btnNo.addEventListener("click", () => removeModal());
btnYes.addEventListener("click", () => {
  updateShoppingItemQunantity("/cart/", targetItemData.id, {
    quantity: targetItemData.quantity,
  }).then((res) => {
    const targetInput = targetElement.element.querySelector(
      ".input-product-quantity"
    );
    targetInput.setAttribute("value", res.quantity);
    targetInput.dispatchEvent(new Event("change"));
  });
  removeModal();
});
