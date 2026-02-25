import { Dexie, type EntityTable } from 'dexie';
import { Wishlist } from './models/Wishlist';
import { WishlistItem } from './models/WishlistItem';

const db = new Dexie('myNextBuy') as Dexie & {
  wishlists: EntityTable<Wishlist, 'id'>;
  wishlistItems: EntityTable<WishlistItem, 'id'>;
};

// Schema Definition
db.version(1).stores({
  wishlists: '++id, name', // Aggiunto indice su name
  wishlistItems: '++id, wishlistId', // Indice su wishlistId per query rapide
});

export { db };
