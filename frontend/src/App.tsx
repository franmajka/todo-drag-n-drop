import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodoPage } from './components/TodoPage/TodoPage'

const queryClient = new QueryClient()

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TodoPage />
  </QueryClientProvider>
)
