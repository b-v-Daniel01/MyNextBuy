import { WishlistItem } from '@/dexie/models/WishlistItem';

export interface WishlistItemService {
  findByWishlistId: (id: number) => Promise<WishlistItem | undefined>; // Dexie può ritornare undefined se non trova nulla
  getAll: () => Promise<WishlistItem[]>;

  // Dexie .put() ritorna la chiave primaria (number) dell'oggetto aggiornato/inserito
  updateWishlist: (wi: WishlistItem) => Promise<number>;

  createWishlist: (wi: WishlistItem) => Promise<number>;

  // Dexie .delete() ritorna void (Promise<void>)
  deleteWishlistById: (id: number) => Promise<void>;
}
