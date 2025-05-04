export interface BookDto {
	id: string;
	title: string;
	imageUrl: string;
	author: string;
	publishedAt: string;
}

export type CreateBookDto = Omit<BookDto, 'id'>;
export type UpdateBookDto = Omit<BookDto, 'id'>;
