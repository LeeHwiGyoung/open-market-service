export const BASE_URL = "https://estapi.openmarket.weniv.co.kr";
/**
 *  method가 post인 fetch
 * @param {string} url - targetUrl ex) login
 * @param {object} body_data 바디에 담을 객체 형식의 데이터
 *
 */
export async function post_fetch(url, body_data) {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_data),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

/**
 * method가 get인 fetch
 * @param {string} url - targetUrl ex) login
 *
 */
export async function get_fetch(url) {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 인증이 필요한 경우의 method가 post인 fetch
 * @param {string} url - targetUrl ex) login
 * @param {object} body_data 바디에 담을 객체 형식의 데이터
 *
 */
export async function auth_post_fetch(url, body_data, token) {
  try {
    await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_data),
    });
  } catch (err) {
    console.error(err);
  }
}

/**
 * 인증이 필요한 경우의 method가 get인 fetch
 * @param {string} url - targetUrl ex) login
 * @param {object} body_data 바디에 담을 객체 형식의 데이터
 *
 */
export async function auth_get_fetch(url, token) {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
