import { Wishlist } from '../../models/Wishlist';
import { WishlistItem } from '../../models/WishlistItem';

export interface IWishlistItemRepository {
  /** Recupera un item specifico tramite ID */
  findById: (id: string) => Promise<WishlistItem | undefined>;

  /** Recupera più item tramite un array di ID */
  findAllByIds: (
    ids: string[], // Cambiato da number[] a string[]
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[]>;

  /** Recupera tutti gli item salvati */
  findAll: (options?: { limit: number; page: number }) => Promise<WishlistItem[]>;

  /** Recupera gli item di una wishlist tramite ID */
  findItemsByWishlistId: (
    id: string,
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[]>;

  /** Recupera gli item di una wishlist tramite l'oggetto Wishlist */
  findItemsByWishlist: (
    wl: Wishlist,
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[]>;

  /** Crea o aggiorna un item (ritorna l'id) */
  save: (wlItem: WishlistItem) => Promise<string>;

  /** Crea o aggiorna più item (ritorna array di id) */
  saveAll: (wlItems: WishlistItem[]) => Promise<string[]>;

  /** Elimina tutti gli item di una specifica wishlist */
  deleteItemsByWishlistId: (wishlistid: string) => Promise<number>;

  /** Elimina un item tramite ID */
  delete: (id: string) => Promise<void>;

  /** Elimina più item tramite array di ID */
  deleteAll: (ids: string[]) => Promise<void>;
}
