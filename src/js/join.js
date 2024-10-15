const join_form = document.getElementsByName("join")[0];
const join_type_container = join_form.querySelector(".join-select-container");
const btn_select_buyer = join_form.querySelector(".btn-select-buyer");
const btn_select_seller = join_form.querySelector("btn-select-seller");
const input_id = join_form.querySelector("#id");
const input_password = join_form.querySelector("#password");
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

async function postFetch(url, data) {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("response", response);
    const json = response.json();
    console.log("json", json);
  } catch (error) {
    console.error(error);
  }
}

function is_fill(idx) {
  for (let i = 0; i < idx; i++) {
    if (!is_fill[i]) {
      // 상위 인풋이 채워지지 않은 경우
      msg[i].textContent = "필수 정보입니다.";
      msg[i].classList.add("display");
    } else {
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
  if (pattern.test(e.target.value)) {
    msg[idx].setAttribute("aria-invalid", false);
    msg[idx].classList.add("display");
    msg[idx].textContent = "멋진 아이디네요:)";
  } else {
    msg[idx].setAttribute("aria-invalid", true);
    msg[idx].classList.add("display");
    msg[idx].textContent =
      "20자 이내의 영문 소문자,대문자,숫자만 사용 가능합니다..";
  }
});

input_id.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
  }
});
input_password.addEventListener("focusout", (e) => {
  const pattern = /^(?=.*[a-z])(?=.*\d)[^\s]{8,}$/; //8자 이상이면서 영어소문자 1자 이상 , 숫자 1자 이상 공백을 포함하지 않는 문자열
  is_valid(pattern, e);
});
input_password.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  is_fill(idx);
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
  }
});

btn_check_id.addEventListener("click", (e) => {
  postFetch("accounts/validate-username/", { username: input_id.value });
});
input_password_check.addEventListener("focusout", (e) => {});
input_password_check.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  is_fill(idx);
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
  }
});
input_name.addEventListener("focusout", (e) => {});
input_name.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  is_fill(idx);
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
  }
});
input_phone_middle.addEventListener("focusout", (e) => {});
input_phone_middle.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  is_fill(idx);
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
  }
});
input_phone_last.addEventListener("focusout", (e) => {});
input_phone_last.addEventListener("keyup", (e) => {
  const idx = e.target.dataset.idx;
  is_fill(idx);
  if (e.target.value === "") {
    is_fill[idx] = false;
  } else {
    is_fill[idx] = true;
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
