import { IWishlistRepository } from '@/data/interfaces/WishlistRepository';
import { db } from '../db';

export const WishlistRepository: IWishlistRepository = {
  findById: async (id: string) => {
    // .get(id) è il modo più veloce per recuperare tramite Primary Key
    return await db.wishlists.get(id);
  },

  findAll: async (options?: { limit: number; page: number }) => {
    const collection = db.wishlists.toCollection();

    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  findAllByIds: async (ids: string[], options?: { limit: number; page: number }) => {
    // anyOf(ids) è corretto per recuperare multipli
    const collection = db.wishlists.where('id').anyOf(ids);

    if (!options) {
      return await collection.toArray();
    }

    const { limit, page } = options;
    const offset = (page - 1) * limit;

    return await collection.offset(offset).limit(limit).toArray();
  },

  countAll: async () => {
    return await db.wishlists.count();
  },

  save: async (wl: Wishlist) => {
    // Dexie.put ritorna la chiave primaria (string in questo caso)
    // L'UUID viene generato dall'hook nel file db.ts se manca
    return (await db.wishlists.put(wl)) as string;
  },

  delete: async (wl: Wishlist) => {
    if (!wl.id) {
      throw new Error('ID mancante per la cancellazione');
    }
    await db.wishlists.delete(wl.id);
  },

  deleteById: async (id: string) => {
    await db.wishlists.delete(id);
  },

  deleteAll: async (wls: Wishlist[]) => {
    // Estraiamo gli ID validi e usiamo bulkDelete
    const ids = wls.map((w) => w.id).filter((id): id is string => !!id);
    await db.wishlists.bulkDelete(ids);
  },

  deleteAllById: async (ids: string[]) => {
    // bulkDelete è molto più performante di where().anyOf().delete()
    await db.wishlists.bulkDelete(ids);
  },
};
