import '@mantine/core/styles.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { RouterLayout } from './layouts/RouterLayout';
import { HomePage } from './pages/Homepage/Home.page';
import { Wishlists } from './pages/Wishlist/WishlistLists';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RouterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="wishlists" element={<Wishlists />} />
            <Route path="settings/account" element={<div>Account Setting page</div>} />
          </Route>

          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
