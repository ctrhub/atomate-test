import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Container, Group, Image } from '@mantine/core';
import { Link as TanStackLink } from '@tanstack/react-router';

import logo from '@/logo.svg';
import { Link } from '@/components/atoms/Link';
import classes from '@/components/organisms/Header.module.css';

const links = [
  { link: '/', label: 'Library' },
];

export default function Header() {
  const items = links.map((link) => (
    <Link
      key={link.label}
      asChild
    >
      <TanStackLink
        to={link.link}
      >
        {link.label}
      </TanStackLink>
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container
        className={classes.inner}
      >
        <Group w={70}>
          <Image src={logo} h={28} alt="logo" />
        </Group>

        <Autocomplete
          className={classes.search}
          placeholder="Search"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
        />

        <Group>
          <Group className={classes.links}>
            {items}
          </Group>
        </Group>
      </Container>
    </header>
  );
}