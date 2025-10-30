// 🔹 Type Definitions

export type wisata = {
  id: string;
  name: string;
  image: string;
  description: string;
  screen: string;
};

export type favorite = {
  id: string;
  name: any;
  image: any;
  description?: any;
};

// 🔹 Base URL (MockAPI)
const BASE_URL = 'https://6902e941d0f10a340b21d337.mockapi.io/faishal';

// ======================================================
// 📍 DESTINATION API
// ======================================================

// Ambil semua destinasi
export async function getwisata(): Promise<wisata[]> {
  try {
    const res = await fetch(`${BASE_URL}/wisata`);
    if (!res.ok) throw new Error('Failed to fetch wisata');
    return await res.json();
  } catch (err) {
    console.error('❌ Error getwisata:', err);
    throw err;
  }
}

// Ambil satu destinasi berdasarkan ID
export async function getwisataById(id: string): Promise<wisata> {
  try {
    const res = await fetch(`${BASE_URL}/wisata/${id}`);
    if (!res.ok) throw new Error('Failed to fetch destination');
    return await res.json();
  } catch (err) {
    console.error('❌ Error getwisataById:', err);
    throw err;
  }
}

// ======================================================
// ❤️ WISHLIST API
// ======================================================

// Ambil semua wishlist
export async function getfavorite(): Promise<favorite[]> {
  try {
    const res = await fetch(`${BASE_URL}/favorite`);
    if (!res.ok) throw new Error('Failed to fetch favorite');
    return await res.json();
  } catch (err) {
    console.error('❌ Error getfavorite:', err);
    throw err;
  }
}

// Tambahkan item ke favorite
export async function addFavorite(item: Omit<favorite, 'id'>): Promise<favorite> {
  try {
    const res = await fetch(`${BASE_URL}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Failed to add Favorite');
    return await res.json();
  } catch (err) {
    console.error('❌ Error addFavorite:', err);
    throw err;
  }
}

// Hapus item dari wishlist
export async function deleteFavorite(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/favorite/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete Favorite');
  } catch (err) {
    console.error('❌ Error deleteFavorite:', err);
    throw err;
  }
}

// ======================================================
// ⚡ Helper Functions (Opsional, biar clean di komponen)
// ======================================================

// Cek apakah item sudah ada di wishlist
export async function isInFavorite(id: string): Promise<boolean> {
  const favorite = await getfavorite();
  return favorite.some((item) => item.id === id);
}

// Toggle wishlist (add/remove otomatis)
export async function toggleWishlist(item: favorite): Promise<void> {
  const wishlist = await getfavorite();
  const exists = wishlist.find((w) => w.name === item.name);

  if (exists) {
    await deleteFavorite(exists.id);
  } else {
    await addFavorite({
      name: item.name,
      image: item.image,
      description: item.description,
    });
  }
}