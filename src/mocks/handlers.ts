import { HttpResponse, http } from 'msw';

import { data } from './books';
import type { BookDto } from '@/types/dtos/books.dto';
import type { PaginatedResponse } from '@/types/dtos/paginated-response.dto';

let books = data as Array<BookDto>;

export const handlers = [
  http.get('/api/books', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);

    const sortedBooks = [...books].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    const totalItems = sortedBooks.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

    const response: PaginatedResponse<BookDto> = {
      data: paginatedBooks,
      totalItems,
      totalPages,
      currentPage: page,
    }

    return HttpResponse.json(response);
  }),

  http.get('/api/books/:id', ({ params }) => {
    const { id } = params
    const book = books.find((b) => b.id === id)
    if (!book) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(book)
  }),

  http.post('/api/books', async ({ request }) => {
    const newBook = await request.json() as Omit<BookDto, 'id'>;
    const bookWithId = { ...newBook, id: String(Date.now()) };
    books.push(bookWithId);
    return HttpResponse.json(bookWithId, { status: 201 })
  }),

  http.put('/api/books/:id', async ({ request, params }) => {
    const { id } = params
    const updatedBookData = await request.json() as Partial<BookDto>;
    const bookIndex = books.findIndex((b) => b.id === id)
    if (bookIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    books[bookIndex] = { ...books[bookIndex], ...updatedBookData };
    return HttpResponse.json(books[bookIndex])
  }),

  http.delete('/api/books/:id', ({ params }) => {
    const { id } = params
    const initialLength = books.length;
    books = books.filter((b) => b.id !== id)
    if (books.length === initialLength) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 })
  }),
]