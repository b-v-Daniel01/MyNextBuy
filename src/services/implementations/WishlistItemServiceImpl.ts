import { iDataProvider } from '@/data/interfaces/DataProvider';
import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';
import { IWishlistItemService } from '../interfaces/WishlistItemService';

export class WishlistItemService implements IWishlistItemService {
  constructor(private provider: iDataProvider) {}

  async findByWishlistId(id: string) {
    return await this.provider.items.findById(id);
  }

  async findAll() {
    return await this.provider.items.findAll();
  }

  async save(wi: WishlistItem) {
    return await this.provider.items.save(wi);
  }

  async saveAll(wis: WishlistItem[]) {
    return await this.provider.items.saveAll(wis);
  }

  async delete(id: string) {
    return await this.provider.items.delete(id);
  }

  async deleteByWishlistId(id: string) {
    await this.provider.items.deleteItemsByWishlistId(id);
  }

  async deleteByWishlist(wl: Wishlist) {
    if (wl.id) {
      return this.delete(wl.id);
    }
  }
}
