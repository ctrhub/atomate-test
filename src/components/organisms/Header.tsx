import { useState } from 'react';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import { Autocomplete, Button, Container, Grid, Group, Image, Modal, Text } from '@mantine/core';
import { Link as TanStackLink, useNavigate, useSearch } from '@tanstack/react-router';
import { useDebouncedCallback, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import type { CreateBookDto, UpdateBookDto } from '@/types/dtos/books.dto';
import logo from '@/logo.svg';
import { Link } from '@/components/atoms/Link';
import classes from '@/components/organisms/Header.module.css';
import { UpsertBookForm } from '@/components/organisms/UpsertBookForm';
import { useBookList } from '@/lib/state/books.state';

const links = [
  { link: '/', label: 'My Library' },
];

export default function Header() {
  const searchParams = useSearch({ from: '/', shouldThrow: false });
  const [search, setSearch] = useState(searchParams?.search || '');
  const [isBookModalOpen, bookModal] = useDisclosure(false);

  const navigate = useNavigate();
  const { createBook, isCreating } = useBookList();

  const handleFormSubmit = async (values: CreateBookDto | UpdateBookDto) => {
    const createdBook = await createBook(values);
    bookModal.close();
    notifications.show({
      color: 'teal',
      title: 'Book created successfully',
      message: (
        <Link asChild><TanStackLink to={`/library/${createdBook.id}`}>Click here to go to the book page.</TanStackLink></Link>
        // <Text>
        // </Text>
      ),
      icon: <IconCheck size={18} />,
    })
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    navigate({
      to: '/',
      search: {
        ...searchParams,
        search: value,
      },
    });
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

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
    <>
      <header className={classes.header}>
        <Container>
          <Grid w="100%" align="center">
            <Grid.Col span={4}>
              <Image src={logo} h={32} w={32} alt="logo" />
            </Grid.Col>
            <Grid.Col span={4}>
              <Autocomplete
                value={search}
                className={classes.search}
                placeholder="Search"
                leftSection={<IconSearch size={16} stroke={1.5} />}
                {...(search.length ? { rightSection: <IconX size={16} stroke={1.5} onClick={() => handleSearchChange('')} /> } : {})}
                onChange={handleSearchChange}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Group justify="end" w="100%">
                <Group className={classes.links}>
                  {items}
                </Group>
                <Button radius="md" onClick={bookModal.open}>
                  Add Book
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </header>
      <Modal opened={isBookModalOpen} onClose={bookModal.close} title="Add Book">
        <UpsertBookForm
          onSubmit={handleFormSubmit}
          isLoading={isCreating}
        />
      </Modal>
    </>
  );
}