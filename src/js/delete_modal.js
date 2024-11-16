import { deleteShoppingItem } from "../utils/shoppingcart_utils.js";

const deleteModalContianer = document.querySelector(".delete-modal-container");
const dimd = deleteModalContianer.querySelector(".dimd");
const btnCancle = deleteModalContianer.querySelector(".btn-cancle");
const modalBtnWrap = deleteModalContianer.querySelector(".modal-btn-wrap");
const btnNo = modalBtnWrap.querySelector(".btn-modal-no");
const btnYes = modalBtnWrap.querySelector(".btn-modal-yes");

const targetItem = {
  element: null,
};

export const setTargetElement = (context) => {
  //modal 과 shoppingItem을 mapping 해주는 함수
  targetItem.element = context;
};

export const displayDeleteModal = () => {
  deleteModalContianer.classList.add("active");
};

const removeModal = () => {
  deleteModalContianer.classList.remove("active");
};

dimd.addEventListener("click", () => removeModal());
btnCancle.addEventListener("click", () => removeModal());
btnNo.addEventListener("click", () => removeModal());
btnYes.addEventListener("click", () => {
  const id = targetItem.element.parentNode.dataset.id;
  deleteShoppingItem(`/cart/${id}`).then(() => {
    targetItem.element.parentNode.remove();
    targetItem.element = null;
  });

  removeModal();
});
