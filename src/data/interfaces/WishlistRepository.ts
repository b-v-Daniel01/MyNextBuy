import { Wishlist } from '@/models/Wishlist';

export interface IWishlistRepository {
  /** Recupera una wishlist specifica tramite ID */
  findById: (id: string) => Promise<Wishlist | undefined>;

  /** Recupera tutte le wishlist salvate con paginazione opzionale */
  findAll: (options?: { limit: number; page: number }) => Promise<Wishlist[]>;

  /** Recupera un set di wishlist tramite un array di ID */
  findAllByIds: (ids: string[], options?: { limit: number; page: number }) => Promise<Wishlist[]>;

  /** Conta il numero totale di wishlist */
  countAll: () => Promise<number>;

  /** Crea o aggiorna una wishlist (ritorna l'ID generato o esistente) */
  save: (wl: Wishlist) => Promise<string>;

  /** Elimina una wishlist specifica */
  delete: (wishlist: Wishlist) => Promise<void>;

  /** Elimina un array di oggetti wishlist */
  deleteAll: (wishlists: Wishlist[]) => Promise<void>;

  /** Elimina una wishlist tramite il suo ID */
  deleteById: (wishlistid: string) => Promise<void>;

  /** Elimina più wishlist tramite i loro ID */
  deleteAllById: (wishlistIds: string[]) => Promise<void>;
}
