import type { BookDto, CreateBookDto, UpdateBookDto } from "@/types/dtos/books.dto";
import type { PaginatedRequest } from "@/types/dtos/paginated-request.dto";

export const booksAPI = {
	async getList(query: PaginatedRequest) {
		const params = new URLSearchParams();

		params.append('page', query.page?.toString() || '1');
		params.append('pageSize', query.pageSize?.toString() || '5');
		query.search && params.append('search', query.search);

		const response = await fetch(`/api/books?${params.toString()}`, {
			method: 'GET',
		});

		if (response.status !== 200) {
			throw new Error('Failed to fetch books');
		}

		return response.json();
	},

	async getDetail(bookId: string) {
		const response = await fetch(`/api/books/${bookId}`);

		if (response.status !== 200) {
			throw new Error('Failed to fetch book');
		}

		return response.json();
	},

	async create(book: CreateBookDto) {
		const response = await fetch('/api/books', {
			method: 'POST',
			body: JSON.stringify(book),
		});

		if (response.status !== 201) {
			throw new Error('Failed to create book');
		}

		return response.json();
	},

	async update(bookId: string, book: UpdateBookDto) {
		const response = await fetch(`/api/books/${bookId}`, {
			method: 'PUT',
			body: JSON.stringify(book),
		});

		if (response.status !== 200) {
			throw new Error('Failed to update book');
		}

		return response.json();
	},

	async delete(bookId: BookDto['id']) {
		const response = await fetch(`/api/books/${bookId}`, {
			method: 'DELETE',
		});

		if (response.status !== 204) {
			throw new Error('Failed to delete book');
		}
	}
}