import AppRouter from "./routes/AppRouter";
import AuthContextProvider from "./contexts/AuthContext";
import {queryClient} from './config/query.config';
import { QueryClientProvider } from "@tanstack/react-query";

const App = () => {  

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
      <AppRouter />
      </AuthContextProvider>
    </QueryClientProvider>
    
  )
}

export default App