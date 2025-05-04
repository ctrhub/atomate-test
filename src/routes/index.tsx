import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { Center, Container, Grid, Pagination } from '@mantine/core';
import z from 'zod';

import { useBookList } from '@/lib/state/books.state';
import { BookCard } from '@/components/organisms/BookCard';

const routeSearchParams = z.object({
  page: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute('/')({
  validateSearch: (searchParams) => routeSearchParams.parse(searchParams),
  component: Page,
})

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { bookList, pagination } = useBookList(search);

  const handlePageChange = (page: number) => {
    navigate({
      to: '/',
      search: {
        page: page,
        ...(search.search ? { search: search.search } : {}),
      },
    });
  };

  return (
    <Container pt="lg">
      <Grid>
        {bookList.map((book) => (
          <Grid.Col span={4} key={book.id}>
            <BookCard book={book} />
          </Grid.Col>
        ))}
      </Grid>
      <Center mt="lg">
        <Pagination
          total={pagination?.totalPages || 1}
          value={pagination?.currentPage || 1}
          onChange={handlePageChange}
        />
      </Center>
    </Container>
  )
}
