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

    if (!response.ok) {
      //아이디나 비밀번호가 틀린 경우 back에서 401코드를 보냄
      displayMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
      input_password.value = "";
      return;
    }

    const json = await response.json();
    if (json.user.user_type !== login_type) {
      //아이디와 비밀번호가 일치하나 타입이 다른 경우
      displayMsg("로그인 정보가 없습니다. 로그인 유형을 확인하세요.");
      input_password.value = "";
      return;
    }

    //아이디와 비밀번호가 일치하는 경우
    localStorage.setItem("access_token", json.access);
    localStorage.setItem("refresh_token", json.refresh);
    referrer.length
      ? (location.href = referrer)
      : (location.herf = "/index.html"); //이전 링크가 없는 경우에 referrer 은 빈 문자열을 반환
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

function fullfiled_login() {
  if (user_name === "") {
    //id가 입력되지 않으면
    input_id.focus(); //id로 focus 이동
    displayMsg("아이디를 입력하세요.");
    return;
  }
  if (password === "") {
    //password가 입력되지 않으면
    input_password.focus(); //password로 포커스 이동
    displayMsg("비밀번호를 입력하세요.");
    return;
  }
}

function validation() {
  fullfiled_login();
  if (!displayMsg) {
    postLogin();
  }
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
  validation();
});

login_form.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    validation();
  }
});

input_id.addEventListener("keydown", (e) => {
  user_name = e.target.value;
  if (display_msg) {
    hideMsg();
  }
});

input_password.addEventListener("keydown", (e) => {
  password = e.target.value;
  if (display_msg) {
    hideMsg();
  }
});
