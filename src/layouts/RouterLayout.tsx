import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderMenu } from '@/components/Header/Header';
import { Navbar } from '../components/navbar/Navbar';

export function RouterLayout() {
  // Inizializziamo a 'true' se vogliamo la navbar aperta all'avvio
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // 'mobile: !opened' nasconde la navbar su schermi piccoli
        // 'desktop: !opened' la nasconde su schermi grandi
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMenu />
      </AppShell.Header>

      {/* <AppShell.Navbar>
        <Navbar closeNavbar={toggle} />
      </AppShell.Navbar> */}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
