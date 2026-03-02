import { IconChevronDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import {
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Image,
  Menu,
  rem,
  ScrollArea,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';

const links = [
  { link: '/', label: 'Homepage' },
  // {
  //   link: '/Learn',
  //   label: 'Learn',
  //   links: [
  //     { link: '/docs', label: 'Documentation' },
  //     { link: '/resources', label: 'Resources' },
  //     { link: '/community', label: 'Community' },
  //     { link: '/blog', label: 'Blog' },
  //   ],
  // },
  { link: '/wishlists', label: 'Wishlist' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '/settings',
    label: 'Settings',
    links: [
      { link: '/account', label: 'Account' },
      { link: '/general', label: 'General' },
      { link: '/aspect', label: 'Aspect' },
    ],
  },
];

export function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  // --- LOGICA DESKTOP ---
  const items = links.map((link) => {
    // Se il link ha dei sottomenu (dropdown)
    if (link.links) {
      const menuItems = link.links.map((item) => (
        <Menu.Item key={item.link} component={Link} to={item.link}>
          {item.label}
        </Menu.Item>
      ));

      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            {/* Nota: Usiamo un <span> o <div> come target se il genitore non è cliccabile, 
                        oppure Link se porta a una pagina */}
            <Link to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    // Link semplice senza sottomenu
    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  // --- LOGICA MOBILE ---
  // Mappiamo i link per il Drawer laterale
  const mobileItems = links.map((link) => {
    // Se è un link con sottomenu, usiamo un componente Collapse custom (definito sotto o inline)
    if (link.links) {
      return <MobileSubMenu key={link.label} link={link} closeDrawer={closeDrawer} />;
    }

    // Link semplice mobile
    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        onClick={closeDrawer} // Chiude il menu quando clicchi
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* LOGO */}
        <Image src="/src/assets/icon.png" w="auto" fit="contain" h={40} />

        {/* MENU DESKTOP (visibile da 'sm' in su) */}
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>

        {/* BURGER ICON (visibile solo sotto 'sm') */}
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" size="sm" />

        {/* DRAWER MOBILE */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigazione"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            {/* Renderizziamo gli items mobile */}
            <div className={classes.mobileLinksContainer}>{mobileItems}</div>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button component={Link} to="/login" variant="default">
                Log in
              </Button>
              <Button component={Link} to="/signup">
                Sign up
              </Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Container>
    </header>
  );
}

// --- COMPONENTE HELPER PER I SOTTOMENU MOBILE ---
// Serve per gestire lo stato di apertura/chiusura di ogni singolo gruppo indipendentemente
function MobileSubMenu({ link, closeDrawer }: { link: any; closeDrawer: () => void }) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton onClick={toggle} className={classes.link}>
        <Center inline style={{ justifyContent: 'space-between', width: '100%' }}>
          <span>{link.label}</span>
          <IconChevronDown
            size={16}
            style={{
              transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 200ms ease',
            }}
          />
        </Center>
      </UnstyledButton>
      <Collapse in={opened}>
        {link.links.map((subItem: any) => (
          <Link
            key={subItem.link}
            to={subItem.link}
            className={`${classes.link} ${classes.subLink}`} // Aggiungi classe per indentazione
            onClick={closeDrawer}
          >
            {subItem.label}
          </Link>
        ))}
      </Collapse>
    </>
  );
}
