const btn_before = document.querySelector(".btn-before");
const referrer = document.referrer;

btn_before.addEventListener("click", (e) => {
  referrer.length !== 0 ? (location.href = referrer) : (location.href = "./"); //이전 링크가 없는 경우에 referrer 은 빈 문자열을 반환
  return;
});
