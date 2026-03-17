import { Link } from 'react-router-dom';
import { Group, NavLink } from '@mantine/core';
import { Wishlist } from '@/models/Wishlist';

export function wishlistCardLink(wishlist: Wishlist) {
  const OPEN_WISHLIST_BASE_LINK = '';

  return (
    <>
      <Group>
        <NavLink
          component={Link}
          to={OPEN_WISHLIST_BASE_LINK + wishlist.id}
          label={wishlist.name}
        />
      </Group>
    </>
  );
}
