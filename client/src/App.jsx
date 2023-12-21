import { Routes, Route, Navigate } from "react-router-dom"
import Chat from "./pages/Chat"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import NavBar from "./components/NavBar"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <NavBar />
      <Container className="text">
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Signin />} />
          <Route path="/signup" element={user ? <Chat /> : <Signup />} />
          <Route path="/signin" element={user ? <Chat /> : <Signin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>

  );
}

export default App
