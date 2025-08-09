import axios from "axios";
const API_BASE = "http://localhost:8080";

export async function fetchWishlist() {
  const token = sessionStorage.getItem('token');
  const res = await axios.get(${API_BASE}/wishlist/getList, {
    headers: {
      Authorization : Bearer ${token},
    },
  });
  console.log("Wishlist response:", res);
  return res.data;
}


export async function removeFromWishlist(propertyId) {
  const token = sessionStorage.getItem('token');
  const res = await fetch(${API_BASE}/wishlist/${propertyId}, {
    method: "DELETE",
    headers: {
      Authorization : Bearer ${token},
    },
  });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res;
}