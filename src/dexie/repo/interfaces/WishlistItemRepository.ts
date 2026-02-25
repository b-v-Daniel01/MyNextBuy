import { NumericLiteral } from 'typescript';
import { db } from '../../db';
import { Wishlist } from '../../models/Wishlist';
import { WishlistItem } from '../../models/WishlistItem';

export interface IWishlistItemRepository {
  /** Recupera un item specifica tramite ID */
  findById: (id: number) => Promise<WishlistItem | undefined>;
  findAllByIds: (
    ids: number[],
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[] | undefined>;

  /** Recupera tutti gli item salvati */
  findAll: (options?: { limit: number; page: number }) => Promise<WishlistItem[]>;

  findItemsByWishlistId: (
    id: number,
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[]>;

  findItemsByWishlist: (
    wl: Wishlist,
    options?: { limit: number; page: number }
  ) => Promise<WishlistItem[]>;

  save: (wlItems: WishlistItem) => Promise<number>;

  saveAll: (wlItems: WishlistItem[]) => Promise<number>;

  /** Elimina solo gli item appartenenti a una specifica wishlist */
  deleteItemsByWishlistId: (wishlistId: number) => Promise<number>;

  delete: (id: number) => Promise<void>;

  deleteAll: (id: number[]) => Promise<void>;
}
