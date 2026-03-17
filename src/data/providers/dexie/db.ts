import Dexie, { type EntityTable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { Wishlist } from '@/models/Wishlist';
import { WishlistItem } from '@/models/WishlistItem';

export class MyDatabase extends Dexie {
  wishlists!: EntityTable<Wishlist, 'id'>;
  wishlistItems!: EntityTable<WishlistItem, 'id'>;

  constructor() {
    super('myNextBuy');

    this.version(1).stores({
      wishlists: 'id, name',
      wishlistItems: 'id, wishlistId',
    });

    // Hook per le Wishlist
    this.wishlists.hook('creating', (_primKey, obj) => {
      if (!obj.id) {
        obj.id = uuidv4();
      }
    });

    // Hook per i WishlistItems
    this.wishlistItems.hook('creating', (_primKey, obj) => {
      if (!obj.id) {
        obj.id = uuidv4();
      }
    });
  }
}

export const db = new MyDatabase();
