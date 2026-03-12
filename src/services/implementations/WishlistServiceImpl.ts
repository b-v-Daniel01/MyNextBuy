import { IWishlistRepository } from '@/data/interfaces/WishlistRepository';
import { IWishlistItemRepository } from '@/data/providers/dexie/repoImpl/WishlistItemRepositoryImpl';
import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';
import { IWishlistService } from '../interfaces/WishlistService';

export class WishlistService implements IWishlistService {
  // Definiamo i repository come dipendenze private
  constructor(
    private wishlistRepo: IWishlistRepository,
    private itemRepo: IWishlistItemRepository
  ) {}

  findByWishlistId = async (id: string) => {
    return await this.wishlistRepo.findById(id);
  };

  countAll = async () => {
    return await this.wishlistRepo.countAll();
  };

  findAll = async (options?: { limit: number; page: number }) => {
    return await this.wishlistRepo.findAll(options);
  };

  findAllByIds = async (ids: string[]) => {
    return await this.wishlistRepo.findAllByIds(ids);
  };

  save = async (wl: Wishlist, wlItems?: WishlistItem[]): Promise<string> => {
    const id = await this.wishlistRepo.save(wl);

    if (wlItems && wlItems.length > 0) {
      const wlItemsToSave = wlItems.map((item) => ({
        ...item,
        wishlistId: id,
      }));

      await this.itemRepo.saveAll(wlItemsToSave);
    }

    return id;
  };

  delete = async (wl: Wishlist) => {
    if (!wl.id) {
      throw new Error('ID mancante');
    }
    await this.itemRepo.deleteItemsByWishlistId(wl.id);
    await this.wishlistRepo.delete(wl);
  };

  deleteAll = async (wls: Wishlist[]) => {
    // Usiamo Promise.all perché forEach non aspetta le operazioni async
    await Promise.all(
      wls.map(async (wl) => {
        if (wl.id) {
          await this.itemRepo.deleteItemsByWishlistId(wl.id);
        }
      })
    );
    await this.wishlistRepo.deleteAll(wls);
  };

  deleteById = async (id: string) => {
    await this.itemRepo.deleteItemsByWishlistId(id);
    await this.wishlistRepo.deleteById(id);
  };

  deleteAllById = async (ids: string[]) => {
    await Promise.all(ids.map((id) => this.itemRepo.deleteItemsByWishlistId(id)));
    await this.wishlistRepo.deleteAllById(ids);
  };
}
