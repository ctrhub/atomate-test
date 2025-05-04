import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Box, Button, Container, Flex, Grid, Group, Image } from '@mantine/core';
import { Link as TanStackLink } from '@tanstack/react-router';

import logo from '@/logo.svg';
import { Link } from '@/components/atoms/Link';
import classes from '@/components/organisms/Header.module.css';

const links = [
  { link: '/', label: 'My Library' },
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
      <Container>
        <Grid w="100%" align="center">
          <Grid.Col span={4}>
            <Image src={logo} h={32} w={32} alt="logo" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Autocomplete
              className={classes.search}
              placeholder="Search"
              leftSection={<IconSearch size={16} stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Group justify="end" w="100%">
              <Group className={classes.links}>
                {items}
              </Group>
              <Button radius="md">
                Add Book
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </header>
  );
}