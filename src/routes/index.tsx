import { useEffect } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Container } from '@mantine/core'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  useEffect(() => {
    fetch('/api/books').then((res) => res.json()).then((data) => console.log(data))
  }, [])
  return (
    <Container>
      book list
      <Link to="/library/1">
        book 1
      </Link>
    </Container>
  )
}
