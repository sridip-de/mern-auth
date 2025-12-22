import AppRouter from "./routes/AppRouter";
import AuthProvider from "./contexts/AuthContext";
import {queryClient} from './config/query.config';
import { QueryClientProvider } from "@tanstack/react-query";

const App = () => {  

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
    
  )
}

export default App