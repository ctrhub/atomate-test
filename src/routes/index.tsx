import { Link, createFileRoute } from '@tanstack/react-router'
import { Container } from '@mantine/core'
import { useBookList } from '@/lib/state/books.state'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { bookList } = useBookList();

  return (
    <Container>
      {bookList.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
      <Link to="/library/1">
        book 1
      </Link>
    </Container>
  )
}
