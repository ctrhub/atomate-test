import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Divider, Loader, Stack, TextInput, Textarea } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';
import '@mantine/dates/styles.css';

import type { CreateBookDto, UpdateBookDto } from "@/types/dtos/books.dto";

export function UpsertBookForm({
	book,
	onSubmit,
	isLoading,
}: {
	book?: CreateBookDto;
	onSubmit: (values: CreateBookDto | UpdateBookDto) => void;
	isLoading?: boolean;
}) {
	const [date, setDate] = useState<Date | null>(dayjs(book?.publishedAt).toDate());

	const form = useForm<CreateBookDto | UpdateBookDto>({
		mode: 'controlled',
    initialValues: {
      title: book?.title || '',
      author: book?.author || '',
			imageUrl: book?.imageUrl || 'https://tjdeed.com/wp-content/uploads/woocommerce-placeholder-300x300.png.webp',
      description: book?.description || '',
			publishedAt: book?.publishedAt || '',
    },

    validate: {
      title: (value) => (value.trim().length > 2 ? null : 'Title is required'),
      author: (value) => (value.trim().length > 2 ? null : 'Author is required'),
      description: (value) => (value.trim().length > 5 ? null : 'Description is required'),
      publishedAt: () => (date ? null : 'Published at is required'),
    },
  });

	const handleSubmit = (values: typeof form.values) => {
		const payload = {
			...values,
			publishedAt: date?.toISOString() || '',
		}
		onSubmit(payload);
  };

	return (
		<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
			<Stack>
				<TextInput
					required
					label="Title"
					placeholder="The Great Gatsby"
					radius="md"
					{...form.getInputProps('title')}
				/>
				<TextInput
					required
					label="Author"
					placeholder="John Doe"
					error={form.errors.author && 'Invalid author'}
					radius="md"
					{...form.getInputProps('author')}
				/>
				<Textarea
					required
					label="Description"
					placeholder="Description"
					error={form.errors.description && 'Description should include at least 6 characters'}
					radius="md"
					{...form.getInputProps('description')}
				/>
				<DateInput
					required
					value={date}
					onChange={(event) => setDate(event)}
					label="Published At"
					placeholder="Published At"
					radius="md"
					error={form.errors.publishedAt && 'Invalid published at'}
				/>
				<Divider my="sm" />
				<Button
					radius="md"
					type="submit"
					disabled={isLoading}
					{...isLoading ? { leftSection: <Loader size="xs" /> } : {}}
				>
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</Stack>
		</form>
	);
}