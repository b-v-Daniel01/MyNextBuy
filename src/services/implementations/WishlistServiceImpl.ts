import { db } from '@/dexie/db';
import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistService } from '../interfaces/WishlistService';

export interface IWishlistRepository {
  /** Recupera una wishlist specifica tramite ID */
  findById(id: number): Promise<Wishlist | undefined>;

  /** Overload 1: Recupera tutte le wishlist senza paginazione */
  findAll: (options?: { limit: number; page: number }) => Promise<Wishlist[]>;

  /** Overload 2: Recupera le wishlist con paginazione */
  findAll(numOfItems: number, pageNumber: number): Promise<Wishlist[]>;

  /** Crea o aggiorna una wishlist */
  save(wishlist: Wishlist): Promise<number>;

  /** Altri metodi... */
  delete(id: number): Promise<void>;
  deleteItemsByWishlistId(wishlistId: number): Promise<number>;
}
