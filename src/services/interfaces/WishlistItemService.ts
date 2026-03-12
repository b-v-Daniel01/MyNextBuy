import { WishlistItem } from '@/models/WishlistItem';

export interface IWishlistItemService {
  findByWishlistId: (id: string) => Promise<WishlistItem | undefined>; // Dexie può ritornare undefined se non trova nulla
  getAll: () => Promise<WishlistItem[]>;

  // Dexie .put() ritorna la chiave primaria (number) dell'oggetto aggiornato/inserito
  updateWishlist: (wi: WishlistItem) => Promise<number>;

  createWishlist: (wi: WishlistItem) => Promise<number>;

  // Dexie .delete() ritorna void (Promise<void>)
  deleteWishlistById: (id: string) => Promise<void>;
}
