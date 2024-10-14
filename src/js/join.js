const dropdown_menu = document.querySelector(".dropdown-menu");
const dropdown_scroll_track = dropdown_menu.querySelector(".scroll-wrap");
const dropdown_scroll_thumb = dropdown_menu.querySelector(".scroll-bar");
dropdown_scroll_track.style.height = `${dropdown_menu.scrollHeight}px`;
let scrollPersent;
const SCROLL_THUMBS_HEIGHT = 90;

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

dropdown_menu.addEventListener("scroll", (e) => {
  const translateY = calcScroll(e);
  dropdown_scroll_thumb.style.transform = `translateY(${translateY}px)`;
});
