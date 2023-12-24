import { Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/Chat"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import NavBar from "./components/NavBar"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className="text">
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Signin />} />
          <Route path="/signup" element={user ? <Chat /> : <Signup />} />
          <Route path="/signin" element={user ? <Chat /> : <Signin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>

  );
}

export default App
