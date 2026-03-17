import { IWishlistItemRepository } from './WishlistItemRepository';
import { IWishlistRepository } from './WishlistRepository';

export interface iDataProvider {
  readonly type: 'local' | 'remote';
  wishlists: IWishlistRepository;
  items: IWishlistItemRepository;
}
