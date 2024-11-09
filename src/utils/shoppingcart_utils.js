import { get_access_token } from "./auth.js";
import { BASE_URL } from "./fetch.js";

export const deleteShoppingItem = async (url) => {
  try {
    const token = get_access_token();
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("netWork Err", res.status);
    }
  } catch (err) {
    console.error(err);
  }
};

export const getShoppingItem = async (url, id) => {
  try {
    const token = get_access_token();
    const res = await fetch(`${BASE_URL}${url}${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("netWork Err", res.status);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const updateShoppingItemQunantity = async (url, id, body) => {
  try {
    const token = get_access_token();
    const res = await fetch(`${BASE_URL}${url}${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("netWork Err", res.status);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
