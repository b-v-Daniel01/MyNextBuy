import { db } from '../../db';
import { Wishlist } from '../../models/Wishlist';
import { WishlistItem } from '../../models/WishlistItem';
import { IWishlistItemRepository } from '../interfaces/WishlistItemRepository';

export const WishlistItemRepository: IWishlistItemRepository = {
  findById: async (id: string) => {
    return await db.wishlistItems.get(id);
  },

  findAll: async (options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.toCollection();
    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;
    return await collection.offset(offset).limit(limit).toArray();
  },

  findAllByIds: async (ids: string[], options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.where('id').anyOf(ids);
    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;
    return await collection.offset(offset).limit(limit).toArray();
  },

  findItemsByWishlistId: async (wishlistId: string, options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.where('wishlistId').equals(wishlistId);
    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;
    return await collection.offset(offset).limit(limit).toArray();
  },

  findItemsByWishlist: async (wl: Wishlist, options?: { limit: number; page: number }) => {
    if (!wl.id) {
      return [];
    }
    // Riutilizziamo il metodo sopra per evitare duplicazione di logica
    return await WishlistItemRepository.findItemsByWishlistId(wl.id, options);
  },

  save: async (wlItem: WishlistItem) => {
    return (await db.wishlistItems.put(wlItem)) as string;
  },

  saveAll: async (wlItems: WishlistItem[]) => {
    // Eseguiamo il salvataggio massivo
    await db.wishlistItems.bulkPut(wlItems);

    // Poiché l'hook 'creating' ha assegnato gli ID agli oggetti originali,
    // li restituiamo mappando l'array.
    return wlItems.map((item) => item.id as string);
  },

  delete: async (id: string) => {
    return await db.wishlistItems.delete(id);
  },

  deleteItemsByWishlistId: async (wishlistId: string) => {
    // Ritorna il numero di elementi eliminati
    return await db.wishlistItems.where('wishlistId').equals(wishlistId).delete();
  },

  deleteAll: async (ids: string[]) => {
    return await db.wishlistItems.bulkDelete(ids);
  },
};
