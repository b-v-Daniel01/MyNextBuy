import { iDataProvider } from '@/data/interfaces/DataProvider';
import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';
import { IWishlistService } from '../interfaces/WishlistService';

export class WishlistService implements IWishlistService {
  // Definiamo i repository come dipendenze private
  constructor(private provider: iDataProvider) {}

  async findByWishlistId(id: string) {
    return await this.provider.wishlists.findById(id);
  }

  async countAll() {
    return await this.provider.wishlists.countAll();
  }

  async findAll(options?: { limit: number; page: number }) {
    return await this.provider.wishlists.findAll(options);
  }

  async findAllByIds(ids: string[]) {
    return await this.provider.wishlists.findAllByIds(ids);
  }

  async save(wl: Wishlist, wlItems?: WishlistItem[]): Promise<string> {
    const id = await this.provider.wishlists.save(wl);

    if (wlItems && wlItems.length > 0) {
      const wlItemsToSave = wlItems.map((item) => ({
        ...item,
        wishlistId: id,
      }));

      await this.provider.items.saveAll(wlItemsToSave);
    }

    return id;
  }

  async delete(wl: Wishlist) {
    if (!wl.id) {
      throw new Error('ID mancante');
    }
    await this.provider.items.deleteItemsByWishlistId(wl.id);
    await this.provider.wishlists.delete(wl);
  }

  async deleteAll(wls: Wishlist[]) {
    // Usiamo Promise.all perché forEach non aspetta le operazioni async
    await Promise.all(
      wls.map(async (wl) => {
        if (wl.id) {
          await this.provider.items.deleteItemsByWishlistId(wl.id);
        }
      })
    );
    await this.provider.wishlists.deleteAll(wls);
  }

  async deleteById(id: string) {
    await this.provider.items.deleteItemsByWishlistId(id);
    await this.provider.wishlists.deleteById(id);
  }

  async deleteAllById(ids: string[]) {
    await Promise.all(ids.map((id) => this.provider.items.deleteItemsByWishlistId(id)));
    await this.provider.wishlists.deleteAllById(ids);
  }
}
