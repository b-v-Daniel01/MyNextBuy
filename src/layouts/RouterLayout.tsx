import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FooterCentered } from '@/components/footer/Footer';
import { HeaderMenu } from '@/components/Header/Header';

// ... altri import

export function RouterLayout() {
  return (
    <AppShell header={{ height: 56 }} footer={{ height: 60 }} padding="md" withBorder={false}>
      <AppShell.Header>
        <HeaderMenu />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>
        <FooterCentered />
      </AppShell.Footer>
    </AppShell>
  );
}
