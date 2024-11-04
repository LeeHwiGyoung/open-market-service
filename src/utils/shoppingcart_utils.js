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
