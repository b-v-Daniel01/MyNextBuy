import { createContext, useContext, useMemo } from 'react';
import { iDataProvider } from '@/data/interfaces/DataProvider';
import { DexieDataProvider } from '@/data/providers/dexie/repoImpl/DexieDataProvider';
import { WishlistItemService } from '@/services/implementations/WishlistItemServiceImpl';
import { WishlistService } from '@/services/implementations/WishlistServiceImpl';
import { IWishlistItemService } from '@/services/interfaces/WishlistItemService';
import { IWishlistService } from '@/services/interfaces/WishlistService';

interface WishlistContextType {
  wishlistService: IWishlistService;
  itemService: IWishlistItemService;
  providerType: 'local' | 'remote';
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode; user?: any }> = ({
  children,
  user,
}) => {
  const dataProvider: iDataProvider = useMemo(() => {
    if (user) {
      return new DexieDataProvider();
    }
    return new DexieDataProvider();
  }, [user]);

  const wishlistService = useMemo(() => {
    return new WishlistService(dataProvider);
  }, [dataProvider]);

  const itemService = useMemo(() => {
    return new WishlistItemService(dataProvider);
  }, [dataProvider]);

  const value = {
    wishlistService,
    itemService,
    providerType: dataProvider.type,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist deve essere utilizzato all'interno di un WishlistProvider");
  }
  return context;
};
