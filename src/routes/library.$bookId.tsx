import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@mantine/core'

export const Route = createFileRoute('/library/$bookId')({
  component: App,
})

function App() {
  useEffect(() => {
    fetch('/api/user').then((res) => res.json()).then((data) => console.log(data))
  }, [])
  return (
    <Container>
      book info
    </Container>
  )
}
