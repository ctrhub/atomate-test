import { HttpResponse, http } from 'msw';
import { data } from './books';
import type { Book } from '@/types/dtos/books.dto';

let books = data as Array<Book>;

export const handlers = [
  http.get('/api/books', () => {
    return HttpResponse.json(books)
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
    const newBook = await request.json() as Omit<Book, 'id'>;
    const bookWithId = { ...newBook, id: String(Date.now()) };
    books.push(bookWithId);
    return HttpResponse.json(bookWithId, { status: 201 })
  }),

  http.put('/api/books/:id', async ({ request, params }) => {
    const { id } = params
    const updatedBookData = await request.json() as Partial<Book>;
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