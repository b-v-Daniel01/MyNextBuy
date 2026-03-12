import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';

export interface IWishlistService {
  findByWishlistId: (id: string) => Promise<Wishlist | undefined>;
  findAll: (options?: { limit: number; page: number }) => Promise<Wishlist[]>;
  findAllByIds: (ids: string[]) => Promise<Wishlist[]>; // Cambiato in string[]

  countAll: () => Promise<number>;

  /** Ritorna l'ID (string) della wishlist salvata */
  save: (wl: Wishlist, wlItems?: WishlistItem[]) => Promise<string>;

  delete: (wishlist: Wishlist) => Promise<void>;
  deleteAll: (wishlists: Wishlist[]) => Promise<void>;
  deleteById: (wishlistid: string) => Promise<void>;
  deleteAllById: (wishlistIds: string[]) => Promise<void>; // Cambiato in string[]
}
