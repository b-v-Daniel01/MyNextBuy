import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistItem } from '@/dexie/models/WishlistItem';

export interface IWishlistService {
  findByWishlistId: (id: number) => Promise<Wishlist | undefined>; // Dexie può ritornare undefined se non trova nulla
  findAll: (options?: { limit: number; page: number }) => Promise<Wishlist[]>;
  findAllByIds: (ids: number[]) => Promise<Wishlist[]>;

  countAll: () => Promise<number>;

  // Dexie .put() ritorna la chiave primaria (number) dell'oggetto aggiornato/inserito
  save: (wl: Wishlist, wlItems?: WishlistItem[]) => Promise<number>;

  delete: (wishlist: Wishlist) => Promise<void>;
  deleteAll: (wishlists: Wishlist[]) => Promise<void>;
  deleteById: (wishlistId: number) => Promise<void>;
  deleteAllById: (wishlistIds: number[]) => Promise<void>;
}
