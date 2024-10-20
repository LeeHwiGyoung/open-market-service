const modal_container = document.querySelector(".modal-container");
const dimd = modal_container.querySelector(".dimd");
const btn_no = modal_container.querySelector(".btn-modal-no");
const btn_yes = modal_container.querySelector(".btn-modal-yes");
const modal_type = modal_container.dataset.type;

export function displayModal() {
  modal_container.classList.add("active");
}

function removeModal() {
  modal_container.classList.remove("active");
}

dimd.addEventListener("click", (e) => {
  removeModal();
});

btn_no.addEventListener("click", (e) => {
  removeModal();
});

btn_yes.addEventListener("click", (e) => {
  if (modal_type === "login") {
    location.href = "/src/html/login.html";
  } else if (modal_type === "del_product") {
    //처리
  } else if (modal_type === "quantity") {
    //처리
  }
});
