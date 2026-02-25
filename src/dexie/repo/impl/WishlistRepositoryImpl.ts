import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistItem } from '@/dexie/models/WishlistItem';
import { db } from '../../db';
import { IWishlistRepository } from '../interfaces/WishlistRepository';

export const WishlistRepository: IWishlistRepository = {
  findById: async (id: number) => {
    return await db.wishlists.get(id);
  },

  findAll: async (options?: { limit: number; page: number }) => {
    const collection = db.wishlists.toCollection();

    if (!options) {
      return await collection.toArray();
    }

    //gestione presenza  filtri
    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  findAllByIds: async (ids: number[], options?: { limit: number; page: number }) => {
    const collection = db.wishlists.where('id').anyOf(ids);
    if (!options) {
      return await collection.toArray();
    }

    //gestione presenza  filtri
    const { limit, page } = options;

    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  save: async (wl: Wishlist) => {
    // Passiamo le tabelle come array per chiarezza [db.wishlists, db.wishlistItems]
    return await db.wishlists.put(wl);
  },

  delete: async (wl: Wishlist) => {
    return await db.wishlists.delete(wl.id);
  },
  deleteById: async (id: number) => {
    return await db.wishlists.delete(id);
  },

  deleteAll: async (wls: Wishlist[]) => {
    const keys: number[] = wls.map((element) => element.id);
    return await db.wishlists.bulkDelete(keys);
  },

  deleteAllById: async (ids: number[]) => {
    return await db.wishlists.bulkDelete(ids);
  },
};
