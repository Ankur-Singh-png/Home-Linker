import axios from "axios";
export async function fetchWishlist() {
  const token = sessionStorage.getItem('token');
  const res = await axios.get(`http://localhost:8080/wishlist/getList`, {
    headers: {
      Authorization : `Bearer ${token}`,
    },
  });
  console.log("Wishlist response:", res);
  return res.data;
}


export async function removeFromWishlist(propertyId) {
  const token = sessionStorage.getItem('token');
  const res = await axios.delete(`http://localhost:8080//wishlist/${propertyId}`, {
    headers: {
      Authorization : `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res;
}