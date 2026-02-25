import { Wishlist } from '@/dexie/models/Wishlist';

export interface WishlistService {
  findByWishlistId: (id: number) => Promise<Wishlist | undefined>; // Dexie può ritornare undefined se non trova nulla
  getAll: () => Promise<Wishlist[]>;

  // Dexie .put() ritorna la chiave primaria (number) dell'oggetto aggiornato/inserito
  updateWishlist: (wl: Wishlist) => Promise<number>;

  createWishlist: (wl: Wishlist) => Promise<number>;

  // Dexie .delete() ritorna void (Promise<void>)
  deleteWishlistById: (id: number) => Promise<void>;
}
