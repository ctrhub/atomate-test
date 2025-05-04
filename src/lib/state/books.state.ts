import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { PaginatedRequest } from "@/types/dtos/paginated-request.dto";
import type { PaginatedResponse } from "@/types/dtos/paginated-response.dto";
import type { BookDto, CreateBookDto, UpdateBookDto } from "@/types/dtos/books.dto";
import { booksAPI } from "@/lib/api/books.api";

const STATE_KEYS = {
	BOOK_LIST: 'book_list',
	BOOK: 'book',
};

export const useBookList = (query: PaginatedRequest = {}) => {
	const queryClient = useQueryClient();
	const queryKey = [STATE_KEYS.BOOK_LIST, query];

	const { data, isLoading } = useQuery<PaginatedResponse<BookDto>>({
		queryKey,
		queryFn: () => booksAPI.getList({ ...query }),
	});

	const { mutateAsync: createBook, isPending: isCreating } = useMutation({
		mutationFn: async (createBookDto: CreateBookDto) => booksAPI.create(createBookDto),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: queryKey });
		}
	});

	const { mutateAsync: updateBook, isPending: isUpdating } = useMutation({
		mutationFn: async ({ bookId, updateBookDto }: { bookId: BookDto['id'], updateBookDto: UpdateBookDto }) => booksAPI.update(bookId, updateBookDto),
		onSuccess: (data, { bookId }) => {
			const cachedBook = queryClient.getQueryCache().find({ queryKey: [STATE_KEYS.BOOK, bookId] });

			if (cachedBook) {
				cachedBook.setData({ ...cachedBook, ...data });
			}

			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: queryKey });
		}
	});

	const { mutateAsync: deleteBook, isPending: isDeleting } = useMutation({
		mutationFn: async (bookId: BookDto['id']) => booksAPI.delete(bookId),
		onSuccess: (_, bookId) => {
			const cachedBook = queryClient.getQueryCache().find({ queryKey: [STATE_KEYS.BOOK, bookId] });

			if (cachedBook) {
				cachedBook.setData(null);
			}

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
		isLoading,
		isCreating,
		isUpdating,
		isDeleting
	}
};

export const useBook = (bookId: BookDto['id']) => {
	const queryKey = [STATE_KEYS.BOOK, bookId];

	const { data, error, isLoading } = useQuery<BookDto>({
		queryKey,
		queryFn: () => booksAPI.getDetail(bookId),
		retry: 1,
	});

	return {
		book: data,
		error,
		isLoading,
	};
};
