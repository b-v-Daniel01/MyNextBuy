import { db } from '@/dexie/db';
import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistRepository } from '@/dexie/repo/impl/WishlistRepositoryImpl';
import { IWishlistService } from '../interfaces/WishlistService';

export const WishlistService: IWishlistService = {
  findByWishlistId: async (wlId: number) => {
    return await WishlistRepository.findById(wlId);
  },

  getAll: async () => {
    return await WishlistRepository.findAll();
  },

  findAllByIds: async (ids: number[]) => {
    return await WishlistRepository.findAllByIds(ids);
  },
  
};
