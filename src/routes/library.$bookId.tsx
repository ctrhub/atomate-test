import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, Button, Container, Flex, Group, Image, List, Loader, Modal, Skeleton, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';

import type { CreateBookDto, UpdateBookDto } from '@/types/dtos/books.dto';
import { useBook, useBookList } from '@/lib/state/books.state';
import { UpsertBookForm } from '@/components/organisms/UpsertBookForm';

export const Route = createFileRoute('/library/$bookId')({
  component: App,
})

function App() {
  const [isBookModalOpen, bookModal] = useDisclosure(false);
  const [isDeleteModalOpen, deleteModal] = useDisclosure(false);

  const params = Route.useParams();
  const navigate = useNavigate();

  const { book, isLoading } = useBook(params.bookId);
  const { deleteBook, updateBook, isDeleting, isUpdating } = useBookList();

  const handleFormSubmit = async (values: CreateBookDto | UpdateBookDto) => {
    await updateBook({ bookId: params.bookId, updateBookDto: values });
    bookModal.close();
  };

  const handleDeleteBook = async () => {
    await deleteBook(params.bookId);
    deleteModal.close();
    navigate({ to: '/', replace: true });
  };

  if (isLoading) {
    return (
      <Container size="md" mt="lg">
        <Flex justify="space-between" gap="120px" py="lg">
          <Box flex={1}>
            <Skeleton w="100%" h="420px" />
          </Box>
          <Skeleton flex={1} w="376px" visibleFrom="md" />
        </Flex>
        <Skeleton flex={1} h="auto" mah="320px" hiddenFrom="md" />
      </Container>
    );
  }

  return (
    <>
      <Container size="md" mt="lg">
        <Flex justify="space-between" gap="120px" py="lg">
          <Box flex={1}>
            <Title fs="44px">
              {book?.title}
            </Title>
            <Flex w="100%" mt="xs" gap="md">
              <Text fz="xs" c="gray.4">
                By: {book?.author}
              </Text>
              <Text fz="xs" c="gray.4">
                Published: {dayjs(book?.publishedAt).format('YYYY/MM/DD')}
              </Text>
            </Flex>
            <Text c="dimmed" mt="md">
              {book?.description}
            </Text>
            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Book description</b> – each book has a detailed description
              </List.Item>
              <List.Item>
                <b>Book image</b> – each book has a cover image
              </List.Item>
              <List.Item>
                <b>Author</b> – each book has an author
              </List.Item>
            </List>
            <Group mt={30}>
              <Button radius="xl" size="md" onClick={bookModal.open}>
                Edit
              </Button>
              <Button radius="xl" size="md" variant="transparent" color="red" onClick={deleteModal.open}>
                Delete
              </Button>
            </Group>
          </Box>
          <Image src={book?.imageUrl} flex={1} w="376px" visibleFrom="md" />
        </Flex>
        <Image src={book?.imageUrl} fit="contain" flex={1} h="auto" mah="320px" hiddenFrom="md" />
      </Container>
      <Modal opened={isBookModalOpen} onClose={bookModal.close} title="Add Book">
        <UpsertBookForm
          book={book}
          onSubmit={handleFormSubmit}
          isLoading={isUpdating}
        />
      </Modal>
      <Modal opened={isDeleteModalOpen} onClose={deleteModal.close} title="Delete Book">
        <Text>
          Are you sure you want to delete this book?
        </Text>
        <Button
          radius="md"
          mt="md"
          w="100%"
          variant="filled"
          color="red"
          onClick={handleDeleteBook}
          disabled={isDeleting}
          {...(isDeleting ? { leftSection: <Loader size="xs" /> } : {})}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal>
    </>
  );
}
