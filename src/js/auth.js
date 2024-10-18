export function set_access_token(token) {
  localStorage.setItem("access_token", token);
}

export function set_refresh_token(token) {
  localStorage.setItem("refresh_token", token);
}

export function get_access_token() {
  return JSON.parse(localStorage.getItem("access_token"));
}

export function get_refresh_token() {
  return JSON.parse(localStorage.getItem("refresh_token"));
}

export async function request_access_token() {
  try {
    const refresh_token = get_refresh_token();
    const res = await fetch(
      "https://estapi.openmarket.weniv.co.kr/accounts/token/refresh",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refresh_token),
      }
    );
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
    alert("다시 로그인하세요.");
  }
}
