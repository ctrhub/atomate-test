import { Box, Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";

import type { BookDto } from "@/types/dtos/books.dto";
import classes from '@/components/organisms/BookCard.module.css';

export function BookCard({ book }: { book: BookDto }) {
	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image src={book.imageUrl} alt={book.title} height={180} />
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group justify="apart">
					<Text fz="sm" fw={600} h={42} className={classes.truncate}>
						{book.title}
					</Text>
				</Group>
				<Text fz="sm" mt="xs" c="gray.6" className={classes.truncate}>
					{book.description}
				</Text>
				<Flex w="100%" mt="xs" justify="space-between">
					<Text fz="xs" c="gray.4">
						By: {book.author}
					</Text>
					<Text fz="xs" c="gray.4">
						{dayjs(book.publishedAt).format('YYYY/MM/DD')}
					</Text>
				</Flex>
			</Card.Section>

			<Box mt="xs" w="100%">
				<Link to={`/library/${book.id}`}>
					<Button radius="md" w="100%">
						Show details
					</Button>
				</Link>
			</Box>
		</Card>
	);
}