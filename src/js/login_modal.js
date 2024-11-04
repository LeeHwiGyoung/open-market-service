const loginModalContianer = document.querySelector(".login-modal-container");
const dimd = loginModalContianer.querySelector(".dimd");
const btnCancle = loginModalContianer.querySelector(".btn-cancle");
const modalBtnWrap = loginModalContianer.querySelector(".modal-btn-wrap");
const btnNo = modalBtnWrap.querySelector(".btn-modal-no");
const btnYes = modalBtnWrap.querySelector(".btn-modal-yes");

export const displayLoginModal = () => {
  loginModalContianer.classList.add("active");
};

const removeModal = () => {
  loginModalContianer.classList.remove("active");
};

const moveLoginPage = () => {
  location.href = "./login.html";
};
dimd.addEventListener("click", () => removeModal());
btnCancle.addEventListener("click", () => removeModal());
btnNo.addEventListener("click", () => removeModal());
btnYes.addEventListener("click", () => moveLoginPage());
