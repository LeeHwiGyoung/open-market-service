const join_form = document.getElementsByName("join")[0];
const join_type_container = join_form.querySelector(".join-select-container");
const btn_select_buyer = join_form.querySelector(".btn-select-buyer");
const btn_select_seller = join_form.querySelector("btn-select-seller");
const input_id = join_form.querySelector("#id");
const input_password = join_form.querySelector("#password");
const img_password = join_form.querySelectorAll(".check");
const input_password_check = join_form.querySelector("#check-password");
const input_name = join_form.querySelector("#user-name");
const input_phone_middle = join_form.querySelector("#phone-number-middle");
const input_phone_last = join_form.querySelector("#phone-number-last");
const input_personnal_check = join_form.querySelector("#personnal-check");
const phone_number_dropdown = document.querySelector(".phone-number-dropdown");
const btn_dropdown = phone_number_dropdown.querySelector(".dropdown-trigger");
const dropdown_menu = phone_number_dropdown.querySelector(".dropdown-menu");
const dropdown_list = dropdown_menu.querySelector(".dropdown-options");
const dropdown_scroll_track = dropdown_menu.querySelector(".scroll-wrap");
const dropdown_scroll_thumb = dropdown_menu.querySelector(".scroll-bar");
const btn_check_id = join_form.querySelector(".btn-check-id");
const btn_join = join_form.querySelector(".btn-join");
const msg = join_form.querySelectorAll(".msg");

dropdown_scroll_track.style.height = `${dropdown_menu.scrollHeight}px`;
let join_type = "BUYER";
let scrollPersent;
let toggle_drop_Down = false;
const input_blank = new Array(7).fill(false);
const SCROLL_THUMBS_HEIGHT = 90;
const BASE_URL = "https://estapi.openmarket.weniv.co.kr";

function throttle(mainFunc, delay) {
  let timerFlag = null;
  return (...args) => {
    if (timerFlag === null) {
      mainFunc(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}

function calcScroll(event) {
  /* 스크롤 퍼센트에 따라 translateY의 값을 계산해주는 함수 */
  const maxY = Math.floor(event.target.scrollHeight - SCROLL_THUMBS_HEIGHT);
  const scrollPercent =
    event.target.scrollTop /
    (event.target.scrollHeight - event.target.clientHeight);
  const translateY = Math.floor(maxY * scrollPercent);
  return translateY;
}

function check_required(idx) {
  for (let i = 0; i < idx; i++) {
    if (!input_blank[i]) {
      // 상위 인풋이 채워지지 않은 경우
      msg[i].textContent = "필수 정보입니다.";
      msg[i].classList.add("display");
    } else if (input_blank[i] && i !== 0) {
      msg[i].textContent = "";
      msg[i].classList.remove("display");
    }
  }
}

join_type_container.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    //button 사이의 빈 공간 클릭시 undefined가 할당되는 것을 막기 위해
    join_type = e.target.dataset.joinType;
    Array.prototype.forEach.call(e.currentTarget.children, (element) => {
      if (element.dataset.joinType === join_type) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }
});

//focusout 이벤트 : 유효성 검사
//keyup 이벤트 : 입력시 상위 인풋을 입력하지 않은 경우
//keyup 이벤트 리팩토링 하기

function validation(pattern, validate_target) {
  if (pattern.test(validate_target)) {
    return true;
  }
  return false;
}

function display_msg(idx, msg_content, is_valid) {
  msg[idx].setAttribute("aria-invalid", !is_valid);
  msg[idx].textContent = msg_content;
  msg[idx].classList.add("display");
}

function remove_msg(idx) {
  msg[idx].classList.remove("display");
}

async function duplicated_id(username) {
  try {
    const response = await fetch(`${BASE_URL}/accounts/validate-username/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    const json = await response.json();

    if (Object.hasOwn(json, "error")) {
      //error 메시지를 갖고 있으면
      display_msg(0, json.error, false);
      return;
    }
    display_msg(0, "멋진 아이디네요:)", true);
  } catch (error) {
    console.error(error);
  }
}

function is_valid(pattern, e, errMsg) {
  const idx = e.target.dataset.idx;
  if (pattern.test(e.target.value)) {
    msg[idx].setAttribute("aria-invalid", false);
    msg[idx].classList.remove("display");
  } else {
    msg[idx].setAttribute("aria-invalid", true);
    msg[idx].classList.add("display");
    msg.textContent = errMsg;
  }
}

input_id.addEventListener("focusout", (e) => {
  const idx = e.target.dataset.idx;
  const pattern = /^[a-zA-Z0-9]{1,20}$/;
  if (!validation(pattern, e.target.value)) {
    display_msg(
      idx,
      "20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.",
      false
    );
    return;
  }
  msg[0].getAttribute("aria-invalid") || remove_msg(idx); //중복확인이 성공한 경우에는 포커스 아웃시 메시지를 없애지 않기 위해서
});

input_id.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  remove_msg(idx); //중복 확인 통과 후 id를 바꾸면 성공 메시지를 지우기 위해
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
});

btn_check_id.addEventListener("click", (e) => {
  const pattern = /^[a-zA-Z0-9]{1,20}$/;
  const target = input_id.value;
  if (!validation(pattern, target)) {
    //유효성 검사
    display_msg(
      0,
      "20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다.",
      false
    );
    return;
  }
  //유효성 검사 성공시
  duplicated_id(target);
});

input_password.addEventListener("focusout", (e) => {
  const idx = e.target.dataset.idx;
  const pattern = /^(?=.*[a-z])(?=.*\d)[^\s]{8,}$/; //8자 이상이면서 영어소문자 1자 이상 , 숫자 1자 이상 공백을 포함하지 않는 문자열
});

input_password.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  check_required(idx);
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
});

input_password_check.addEventListener("focusout", (e) => {});
/* input_password_check.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  check_required(idx);
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
}); */
input_name.addEventListener("focusout", (e) => {});
input_name.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  check_required(idx);
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
});
input_phone_middle.addEventListener("focusout", (e) => {});
input_phone_middle.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  check_required(idx);
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
});
input_phone_last.addEventListener("focusout", (e) => {});
input_phone_last.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  check_required(idx);
  if (e.target.value === "") {
    input_blank[idx] = false;
  } else {
    input_blank[idx] = true;
  }
});
document.addEventListener("click", (e) => {
  //드롭다운 외부를 클릭했을 시 드롭다운이 닫히는 이벤트
  if (!phone_number_dropdown.contains(e.target)) {
    dropdown_menu.classList.remove("active");
    toggle_drop_Down = false;
    btn_dropdown.ariaExpanded = toggle_drop_Down;
  }
});

btn_dropdown.addEventListener("click", () => {
  //드롭다운 버튼을 눌렀을 때 드롭다운 열고 닫는 이벤트
  btn_dropdown.ariaExpanded = !toggle_drop_Down;
  toggle_drop_Down = !toggle_drop_Down;
  dropdown_menu.classList.toggle("active");
});

dropdown_list.addEventListener("keydown", (e) => {
  //키보드 유저를 위한 enter로 드랍다운 아이템 고르기

  console.log(e);
});

dropdown_list.addEventListener("click", (e) => {
  //드롭다운 아이템 중 li 태그를 클릭했을 때 trigger의 value를 바꾸는 이벤트
  if (e.target.nodeName === "LI") {
    btn_dropdown.firstElementChild.textContent = e.target.dataset.value;
    dropdown_menu.classList.remove("active");
    toggle_drop_Down = false;
    btn_dropdown.ariaExpanded = toggle_drop_Down;
  }
});

dropdown_menu.addEventListener("scroll", (e) => {
  //dropdown scroll
  const translateY = calcScroll(e);
  dropdown_scroll_thumb.style.transform = `translateY(${translateY}px)`;
});
