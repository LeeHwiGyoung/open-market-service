export function set_access_token(token) {
  sessionStorage.setItem("access_token", token);
}

export function set_refresh_token(token) {
  sessionStorage.setItem("refresh_token", token);
}

export function get_access_token() {
  return sessionStorage.getItem("access_token");
}

export function get_refresh_token() {
  return sessionStorage.getItem("refresh_token");
}

export async function login_with_token(url) {
  try {
    const access_token = get_access_token();
    if (access_token === null) {
      throw new error("다시 로그인 해주세요");
    }

    const res = await fetch(`https://estapi.openmarket.weniv.co.kr/${url}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (Object.hasOwn(json, "detail") && Object.hasOwn(json, "code")) {
      //만료 or Envalid
      request_access_token();
    }
  } catch (error) {
    console.error(error);
    alert("다시 로그인하세요.");
  }
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
