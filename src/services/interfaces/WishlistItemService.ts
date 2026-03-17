import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';

export interface IWishlistItemService {
  findByWishlistId: (id: string) => Promise<WishlistItem | undefined>; // Dexie può ritornare undefined se non trova nulla
  findAll: () => Promise<WishlistItem[]>;

  // Dexie .put() ritorna la chiave primaria (number) dell'oggetto aggiornato/inserito
  save: (wi: WishlistItem) => Promise<string>;
  saveAll: (wlItems: WishlistItem[]) => Promise<string[]>;

  // Dexie .delete() ritorna void (Promise<void>)
  delete: (id: string) => Promise<void>;
  deleteByWishlistId: (id: string) => Promise<void>;
  deleteByWishlist: (wl: Wishlist) => Promise<void>;
}
