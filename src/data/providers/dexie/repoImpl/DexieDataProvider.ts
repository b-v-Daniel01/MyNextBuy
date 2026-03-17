import { iDataProvider } from '@/data/interfaces/DataProvider';
import { WishlistItemRepository } from './WishlistItemRepositoryImpl';
import { WishlistRepository } from './WishlistRepositoryImpl';

export class DexieDataProvider implements iDataProvider {
  readonly type = 'local' as const;
  wishlists = WishlistRepository;
  items = WishlistItemRepository;
}
