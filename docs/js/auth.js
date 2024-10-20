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

export async function check_access_token(url) {
  try {
    const access_token = get_access_token();
    const res = await fetch(`https://estapi.openmarket.weniv.co.kr/${url}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    // HTTP 응답 상태 코드가 2xx가 아닐 경우 예외 처리
    if (!res.ok) {
      return false; // 요청이 실패한 경우 false 반환
    }
    const json = await res.json();
    // 만료된 토큰 또는 다른 이유로 실패한 경우
    if (Object.hasOwn(json, "detail") && Object.hasOwn(json, "code")) {
      return false;
    }
    return true; // 유효한 토큰인 경우 true 반환
  } catch (error) {
    console.error("Error during login check:", error);
    return false; // 네트워크 에러 등 예외 발생 시 false 반환
  }
}

export async function request_access_token() {
  try {
    const refresh_token = get_refresh_token();
    const data = { refresh: refresh_token };

    const res = await fetch(
      "https://estapi.openmarket.weniv.co.kr/accounts/token/refresh/",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();
    if (Object.hasOwn(json, "detail") && Object.hasOwn(json, "code")) {
      throw new Error();
    }
    set_access_token(json.access);
    return true;
  } catch (error) {
    return false;
  }
}

export async function check_login(url) {
  const is_valid = await check_access_token(url);
  if (!is_valid) {
    //엑세스 토큰이 유효하지 않으면
    const state = await request_access_token(); //refresh 토큰이 유효하면 엑세스 토큰을 저장하고 true 반환 아니면 false반환
    return state;
  }

  //엑세스 토큰이 유효하면
  return true;
}
