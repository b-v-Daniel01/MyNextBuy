import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistItem } from '@/dexie/models/WishlistItem';

export interface IWishlistRepository {
  /** Recupera una wishlist specifica tramite ID */
  findById: (id: number) => Promise<Wishlist | undefined>;

  /** Recupera tutte le wishlist salvate */
  findAll: (options?: { limit: number; page: number }) => Promise<Wishlist[]>;

  findAllByIds: (id: number[], options?: { limit: number; page: number }) => Promise<Wishlist[]>;

  /** Crea o aggiorna una wishlist */
  save: (wl: Wishlist) => Promise<number>;

  /** Elimina [una] wishlist */
  delete: (wishlist: Wishlist) => Promise<void>;
  deleteAll: (wishlists: Wishlist[]) => Promise<void>;
  deleteById: (wishlistId: number) => Promise<void>;
  deleteAllById: (wishlistIds: number[]) => Promise<void>;
}
