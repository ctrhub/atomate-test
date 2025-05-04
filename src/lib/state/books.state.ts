import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { PaginatedRequest } from "@/types/dtos/paginated-request.dto";
import type { PaginatedResponse } from "@/types/dtos/paginated-response.dto";
import type { BookDto, CreateBookDto, UpdateBookDto } from "@/types/dtos/books.dto";
import { booksAPI } from "@/lib/api/books.api";

const STATE_KEYS = {
	BOOK_LIST: 'book_list',
};

export const useBookList = (query: PaginatedRequest = {}) => {
	const queryClient = useQueryClient();
	const queryKey = [STATE_KEYS.BOOK_LIST, query];

	const { data } = useQuery<PaginatedResponse<BookDto>>({
		queryKey,
		queryFn: () => booksAPI.getList({ ...query }),
	});

	const { mutateAsync: createBook } = useMutation({
		mutationFn: async (createBookDto: CreateBookDto) => booksAPI.create(createBookDto),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: queryKey });
		}
	});

	const { mutateAsync: updateBook } = useMutation({
		mutationFn: async ({ bookId, updateBookDto }: { bookId: BookDto['id'], updateBookDto: UpdateBookDto }) => booksAPI.update(bookId, updateBookDto),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: queryKey });
		}
	});

	const { mutateAsync: deleteBook } = useMutation({
		mutationFn: async (bookId: BookDto['id']) => booksAPI.delete(bookId),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: queryKey });
		}
	});

	const bookList = data?.data || [];
	const pagination = data;

	return {
		bookList,
		pagination,
		createBook,
		updateBook,
		deleteBook,
	}
};