const BASE_URL = "https://estapi.openmarket.weniv.co.kr";

export async function post_cart(product_id, quantity, token) {
  try {
    await fetch(`${BASE_URL}/cart/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
