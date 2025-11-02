import { NotificationContextProvider } from '../features/notification/contexts/NotificationContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginContextProvider } from '../features/authentication/contexts/LoginContextProvider'
const AppProvider = (props) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <LoginContextProvider>{props.children}</LoginContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
