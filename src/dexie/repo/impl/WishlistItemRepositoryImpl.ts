import { db } from '../../db';
import { Wishlist } from '../../models/Wishlist';
import { WishlistItem } from '../../models/WishlistItem';
import { IWishlistItemRepository } from '../interfaces/WishlistItemRepository';

export const WishlistItemRepository: IWishlistItemRepository = {
  findById: async (id: number) => {
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

  findAllByIds: async (ids: number[], options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.where('id').anyOf(ids);

    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  findItemsByWishlistId: async (wlId: number, options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.where('wishlistId').equals(wlId);

    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  findItemsByWishlist: async (wl: Wishlist, options?: { limit: number; page: number }) => {
    const collection = db.wishlistItems.where('wishlistId').equals(wl.id);

    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  save: async (wlItem: WishlistItem) => {
    return await db.wishlistItems.put(wlItem);
  },

  saveAll: async (wlItems: WishlistItem[]) => {
    return await db.wishlistItems.bulkPut(wlItems);
  },

  delete: async (id: number) => {
    return await db.wishlistItems.delete(id);
  },

  deleteItemsByWishlistId: async (wishlistId: number) => {
    return await db.wishlistItems.where('wishlistId').equals(wishlistId).delete();
  },
  deleteAll: async (ids: number[]) => {
    return await db.wishlistItems.bulkDelete(ids);
  },
};
