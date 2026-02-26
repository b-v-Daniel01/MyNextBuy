import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
        <Group h="100%" px="md">
          {/* Rimuoviamo 'hiddenFrom' o 'visibleFrom' per rendere il burger SEMPRE presente */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color="blue" // Opzionale: per renderlo più visibile
          />
          <Text fw={700}>My Next Buy</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        {/* Passiamo toggle se vogliamo che la navbar si chiuda al click su mobile */}
        <Navbar closeNavbar={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
