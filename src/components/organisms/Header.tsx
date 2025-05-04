import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link as TanStackLink } from '@tanstack/react-router';

import logo from '@/logo.svg';
import { Link } from '@/components/atoms/Link';
import classes from '@/components/organisms/Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

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
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Image src={logo} h={28} alt="logo" />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}