import { useEffect, useState } from 'react';
import { IconBellRinging, IconHome, IconLogin, IconReceipt2 } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Group } from '@mantine/core';
import classes from './navbar.module.css';

const data = [
  { link: '/homepage', label: 'Homepage', icon: IconHome },
  { link: '/wishlists', label: 'Wishlists', icon: IconBellRinging },
  { link: '/settings', label: 'Account', icon: IconReceipt2 },
];

interface NavbarProps {
  closeNavbar: () => void;
}

export function Navbar({ closeNavbar }: NavbarProps) {
  const location = useLocation();

  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        closeNavbar();
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>v0.1.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogin className={classes.linkIcon} stroke={1.5} />
          <span>Login</span>
        </a>
      </div>
    </nav>
  );
}
