const login_form = document.getElementsByName("login")[0];
const login_type_container = login_form.querySelector(
  ".login-select-container"
);
const input_id = login_form.querySelector(".input-login-id");
const input_password = login_form.querySelector(".input-login-password");
const msg = login_form.querySelector(".msg");

let login_type = "BUYER";
let user_name = "";
let password = "";

async function postLogin() {}
//login_type 을 선택하는 이벤트
login_type_container.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    //button 사이의 빈 공간 클릭시 undefined가 할당되는 것을 막기 위해
    login_type = e.target.dataset.loginType;
    Array.prototype.forEach.call(e.currentTarget.children, (element) => {
      if (element.dataset.loginType === login_type) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }
});

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
});

input_id.addEventListener("keyup", (e) => {
  user_name = e.target.value;
});

input_password.addEventListener("keyup", (e) => {
  password = e.target.value;
});
