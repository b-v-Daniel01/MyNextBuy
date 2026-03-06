import { Wishlist } from '@/dexie/models/Wishlist';
import { Group, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';

export function wishlistCardLink(wishlist:Wishlist) {
  const OPEN_WISHLIST_BASE_LINK = ''


  return (
    <>
      <Group>
        <NavLink component={Link} to={ openWishlistBaseLink + wishlist.id} label={link.label}} />
      </Group>
    </>
  );
}
