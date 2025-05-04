export interface PaginatedResponse<T> {
	data: Array<T>,
	totalItems: number,
	totalPages: number,
	currentPage: number,
}
