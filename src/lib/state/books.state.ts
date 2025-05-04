import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { PaginatedRequest } from "@/types/dtos/paginated-request.dto";
import type { PaginatedResponse } from "@/types/dtos/paginated-response.dto";
import type { BookDto, CreateBookDto, UpdateBookDto } from "@/types/dtos/books.dto";
import { booksAPI } from "@/lib/api/books.api";

const STATE_KEYS = {
	BOOK_LIST: 'book_list',
};

export function getNextPageParam<TData>(lastPage: PaginatedResponse<TData>) {
  if (!lastPage.currentPage) return undefined;

  if (lastPage.data.length === 0) return undefined;

  const hasMorePages = lastPage.currentPage < lastPage.totalPages;

  return hasMorePages ? lastPage.currentPage + 1 : undefined;
}

export const useBookList = (query: PaginatedRequest = {}) => {
	const queryClient = useQueryClient();
	const queryKey = [STATE_KEYS.BOOK_LIST, query];
	const baseQueryKey = [STATE_KEYS.BOOK_LIST];
	
	const getBookList = ({ pageParam }: Record<string, any>) => booksAPI.getList({ ...query, page: pageParam });
	const { data } = useInfiniteQuery({
		queryKey,
		initialPageParam: undefined,
		queryFn: getBookList,
		getNextPageParam: (lastPage) => getNextPageParam(lastPage),
	});

	const { mutateAsync: createBook } = useMutation({
		mutationFn: async (createBookDto: CreateBookDto) => booksAPI.create(createBookDto),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: baseQueryKey });
		}
	});

	const { mutateAsync: updateBook } = useMutation({
		mutationFn: async ({ bookId, updateBookDto }: { bookId: BookDto['id'], updateBookDto: UpdateBookDto }) => booksAPI.update(bookId, updateBookDto),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: baseQueryKey });
		}
	});

	const { mutateAsync: deleteBook } = useMutation({
		mutationFn: async (bookId: BookDto['id']) => booksAPI.delete(bookId),
		onSuccess: () => {
			// This could be optimized with optimistic updates later
			queryClient.invalidateQueries({ queryKey: baseQueryKey });
		}
	});

	// Concatenate all data pages into a single array
	const bookList = data?.pages.flatMap((page) => page?.data || []) || [];

	return {
		bookList,
		createBook,
		updateBook,
		deleteBook,
	}
};