import AppRouter from "./routes/AppRouter";
import AuthProvider from "./contexts/AuthContext";

const App = () => {

  const notify = () => toast('wow so easy!')
  

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App