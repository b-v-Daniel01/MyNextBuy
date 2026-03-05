import { db } from '@/dexie/db';
import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistItem } from '@/dexie/models/WishlistItem';
import { WishlistItemRepository } from '@/dexie/repo/impl/WishlistItemRepositoryImpl';
import { WishlistRepository } from '@/dexie/repo/impl/WishlistRepositoryImpl';
import { IWishlistService } from '../interfaces/WishlistService';

export const WishlistService: IWishlistService = {
  findByWishlistId: async (wlId: number) => {
    return await WishlistRepository.findById(wlId);
  },

  countAll: async () => {
    return WishlistRepository.countAll();
  },

  findAll: async (options?: { limit: number; page: number }) => {
    return await WishlistRepository.findAll(options);
  },

  findAllByIds: async (ids: number[]) => {
    return await WishlistRepository.findAllByIds(ids);
  },

  save: async (wl: Wishlist, wlItems?: WishlistItem[]) => {
    const id: number = await WishlistRepository.save(wl);

    if (wlItems) {
      const wlItemsToSave = wlItems.map((e) => {
        e.wishlistId = id;
        return e;
      });

      WishlistItemRepository.saveAll(wlItemsToSave);
    }

    return id;
  },

  delete: async (wl: Wishlist) => {
    await WishlistItemRepository.deleteItemsByWishlistId(wl.id);
    return await WishlistRepository.delete(wl);
  },

  deleteAll: async (wls: Wishlist[]) => {
    wls.forEach(async (element) => {
      await WishlistItemRepository.deleteItemsByWishlistId(element.id);
    });

    return await WishlistRepository.deleteAll(wls);
  },

  deleteById: async (wlId: number) => {
    await WishlistItemRepository.deleteItemsByWishlistId(wlId);
    return await WishlistRepository.delete(wl);
  },

  deleteAllById: async (ids: number[]) => {
    ids.forEach(async (element) => {
      await WishlistItemRepository.deleteItemsByWishlistId(element);
    });

    return await WishlistRepository.deleteAllById(ids);
  },
};
