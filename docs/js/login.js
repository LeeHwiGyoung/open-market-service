import { set_access_token, set_refresh_token } from "./auth.js";

const login_form = document.getElementsByName("login")[0];
const login_type_container = login_form.querySelector(
  ".login-select-container"
);
const input_id = login_form.querySelector(".input-login-id");
const input_password = login_form.querySelector(".input-login-password");
const msg = login_form.querySelector(".msg");
const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
const referrer = document.referrer;
let display_msg = false;
let login_type = "BUYER";
let user_name = "";
let password = "";

async function postLogin() {
  try {
    const response = await fetch(`${BASE_URL}/accounts/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user_name,
        password: password,
        login_type: login_type,
      }),
    });

    const json = await response.json();

    if (Object.hasOwn(json, "error")) {
      //validation 실패시
      displayMsg(json.error);
      input_password.value = ""; //패스워드 초기화
      input_password.focus();
      return;
    }

    //로그인 성공 시
    //토큰 저장
    set_access_token(json.access);
    set_refresh_token(json.refresh);
    //referrer가 있으면 이전페이지로 아니면 홈으로 이동
    referrer.length !== 0
      ? (location.href = referrer)
      : (location.href = "../"); //이전 링크가 없는 경우에 referrer 은 빈 문자열을 반환
    return;
  } catch (error) {
    console.log(error);
  }
}

function displayMsg(errMsg) {
  display_msg = true;
  msg.textContent = errMsg;
  msg.classList.add("display");
}

function hideMsg() {
  display_msg = false;
  msg.classList.remove("display");
}

function validation_login() {
  if (input_id.value === "") {
    //id가 입력되지 않으면
    input_id.focus(); //id로 focus 이동
    displayMsg("아이디를 입력하세요.");
    return false;
  }

  if (input_password.value === "") {
    //password가 입력되지 않으면
    input_password.focus(); //password로 포커스 이동
    displayMsg("비밀번호를 입력하세요.");
    return false;
  }

  if (!display_msg) {
    return true;
  }
  return false;
}

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
  if (validation_login()) {
    postLogin();
  }
});

input_id.addEventListener("change", (e) => {
  user_name = e.target.value;
  if (display_msg) {
    hideMsg();
  }
});

input_password.addEventListener("change", (e) => {
  password = e.target.value;
  if (display_msg) {
    hideMsg();
  }
});
