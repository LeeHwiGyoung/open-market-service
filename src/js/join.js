import { post_fetch } from "../utils/fetch.js";

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
const referrer = document.referrer;
let join_type = "BUYER";
let scrollPersent;
let toggle_drop_Down = false;
const BUYER_MAX_IDX = 4;
const SELLER_MAX_IDX = 6;
const input_valid = new Array(7).fill(false); // 0 : username , 1 : password , 2:password_check , 3:name , 4:phone , 5~6 : seller
const SCROLL_THUMBS_HEIGHT = 90;

dropdown_scroll_track.style.height = `${dropdown_menu.scrollHeight}px`;

const userdata = {
  username: "",
  password: "",
  name: "",
  phone_number: "",
  phone_middle: "",
  phone_last: "",
};

let phone_identification_number = "010";

function ignore_key(key) {
  //입력이 되지 않는 키인 경우 true 리턴
  const ignore_key_set = new Set([
    "Shift",
    "Control",
    "Alt",
    "CapsLock",
    "Meta",
    "Fn",
    "Escape",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Insert",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "Tab",
    "NumLock",
  ]);
  if (ignore_key_set.has(key)) {
    return true;
  }
  return false;
}

// 폼의 유효성을 확인하는 함수
function checkFormValidity() {
  console.log("checkform");
  if (join_type === "BUYER") {
    //구매자 회원가입
    for (let i = 0; i <= BUYER_MAX_IDX; i++) {
      if (!input_valid[i]) {
        //valid하지 못한 값이 있으면
        btn_join.disabled = true; //버튼 비활성화
        return;
      }
    }
    //모든 인풋 값이 유효하고  form 내의 요소가 입력이 다 되었을 때
    btn_join.disabled = !join_form.checkValidity();
    return;
  }
  //판매자 회원가입
  for (let i = 0; i <= SELLER_MAX_IDX; i++) {
    if (!input_valid[i]) {
      //valid하지 못한 값이 있으면
      btn_join.disabled = true; //버튼 비활성화
      return;
    }
  }
  //모든 인풋 값이 유효하면
  btn_join.disabled = !join_form.checkValidity();
}

async function post_signup(userdata) {
  try {
    const json = await post_fetch("accounts/buyer/signup", userdata);
    const phone_number = json.phone_number;
    if (typeof phone_number !== "string") {
      //phone_number 중복
      input_valid[4] = false;
      display_msg(4, phone_number[0], false);
      return;
    }
    //referrer가 있으면 이전페이지로 아니면 홈으로 이동
    referrer.length !== 0
      ? (location.href = referrer)
      : (location.href = "/src/html/home.html"); //이전 링크가 없는 경우에 referrer 은 빈 문자열을 반환
    return;
  } catch (err) {
    console.error(err);
  }
}

function calc_scroll(event) {
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
    if (!input_valid[i]) {
      // 상위 인풋이 채워지지 않은 경우
      display_msg(i, "필수정보입니다.", false);
    }
  }
}

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
    const json = await post_fetch("accounts/validate-username/", {
      username: username,
    });

    if (Object.hasOwn(json, "error")) {
      //error 메시지를 갖고 있으면
      display_msg(0, json.error, false);
      return;
    }

    display_msg(0, "멋진 아이디네요:)", true);
    input_valid[0] = true;
  } catch (error) {
    console.error(error);
  }
}

function phone_valid(e) {
  const phone_middle = userdata.phone_middle;
  const phone_last = userdata.phone_last;
  const idx = e.target.dataset.idx;
  // 두 개의 인풋이 모두 4자리가 입력되었을 때만 valid 상태 true로 설정
  if (phone_middle.length >= 3 && phone_last.length === 4) {
    input_valid[idx] = true;
  } else {
    input_valid[idx] = false;
  }
}
//focusout 이벤트 : 유효성 검사
//keyup 이벤트 : 입력시 상위 인풋을 입력하지 않은 경우
//keyup 이벤트 리팩토링 하기

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

input_id.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  userdata.username = e.target.value;
  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
});

btn_check_id.addEventListener("click", (e) => {
  const pattern = /^[a-zA-Z0-9]{1,20}$/;
  const target = userdata.username;
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
  userdata.password = e.target.value;
  if (!validation(pattern, e.target.value)) {
    display_msg(
      idx,
      "8자 이상,영문 대 소문자,숫자,특수문자를 사용하세요.",
      false
    );
    img_password[0].setAttribute("src", "/assets/images/icon-check-off.svg");
    img_password[0].setAttribute("alt", "유효하지 않은 비밀번호입니다.");
    input_valid[1] = false;
    return;
  }
  img_password[0].setAttribute("src", "/assets/images/icon-check-on.svg");
  img_password[0].setAttribute("alt", "유효한 비밀번호입니다.");
  input_valid[1] = true;
  remove_msg(idx);
});

input_password.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경되면 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
  check_required(idx);
});

input_password_check.addEventListener("focusout", (e) => {
  const idx = e.target.dataset.idx;
  const password_validity = input_valid[1];

  if (!password_validity) {
    //비밀번호의 validity가 맞지 않으면
    return;
  }

  if (e.target.value !== userdata.password) {
    //비밀번호와 일치하지 않으면
    display_msg(idx, "비밀번호가 일치하지 않습니다.", false);
    img_password[1].setAttribute("src", "/assets/images/icon-check-off.svg");
    img_password[1].setAttribute("alt", "비밀번호가 일치하지 않습니다.");
    input_valid[idx] = false;
    return;
  }

  img_password[1].setAttribute("src", "/assets/images/icon-check-on.svg");
  img_password[1].setAttribute("alt", "비밀번호가 일치합니다.");
  input_valid[idx] = true;
  remove_msg(idx);
});

input_password_check.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경되면 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
  check_required(idx);
});

input_name.addEventListener("focusout", (e) => {
  const idx = e.target.dataset.idx;

  if (e.target.value === "") {
    input_valid[idx] = false;
  }
  input_valid[idx] = true;
});

input_name.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  userdata.name = e.target.value;

  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경되면 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
  check_required(idx);
});

input_phone_middle.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  userdata.phone_middle = e.target.value;
  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경되면 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
  check_required(idx);
});

input_phone_last.addEventListener("keydown", (e) => {
  const idx = e.target.dataset.idx;
  userdata.phone_last = e.target.value;
  if (ignore_key(e.key)) {
    //input의 value를 건드리지 않는 키
    return;
  }
  //input의 value가 변경되면 되면
  input_valid[idx] = false; //validation 결과값 초기화
  remove_msg(idx); //경고 메시지 초기화
  check_required(idx);
});

input_phone_last.addEventListener("focusout", phone_valid);
input_phone_middle.addEventListener("focusout", phone_valid);

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

  if (toggle_drop_Down == true) {
    Array.prototype.forEach.call(dropdown_list.children, (options) => {
      if (options.dataset.value === phone_identification_number) {
        options.focus();
      }
    }); //dropdown 이 열려있을 때 선택된 요소로 focus이동
  }
});

dropdown_list.addEventListener("keydown", (e) => {
  //키보드 유저를 위한 enter로 드랍다운 아이템 고르기
  if (e.key === "Enter") {
    btn_dropdown.firstElementChild.textContent = e.target.dataset.value;
    phone_identification_number = e.target.dataset.value;
    dropdown_menu.classList.remove("active");
    toggle_drop_Down = false;
    btn_dropdown.ariaExpanded = toggle_drop_Down;
  }
});

dropdown_list.addEventListener("click", (e) => {
  //드롭다운 아이템 중 li 태그를 클릭했을 때 trigger의 value를 바꾸는 이벤트
  if (e.target.nodeName === "LI") {
    btn_dropdown.firstElementChild.textContent = e.target.dataset.value;
    phone_identification_number = e.target.dataset.value;
    dropdown_menu.classList.remove("active");
    toggle_drop_Down = false;
    btn_dropdown.ariaExpanded = toggle_drop_Down;
  }
});

dropdown_menu.addEventListener("scroll", (e) => {
  //dropdown scroll
  const translateY = calc_scroll(e);
  dropdown_scroll_thumb.style.transform = `translateY(${translateY}px)`;
});

input_personnal_check.addEventListener("input", checkFormValidity);
join_form.addEventListener("focusout", checkFormValidity);

btn_join.addEventListener("click", (e) => {
  e.preventDefault();
  post_signup({
    username: userdata.username,
    password: userdata.password,
    name: userdata.name,
    phone_number:
      phone_identification_number + userdata.phone_middle + userdata.phone_last,
  });
});
