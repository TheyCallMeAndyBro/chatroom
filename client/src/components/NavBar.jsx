import { useContext } from "react"
import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Notification from "./chat/Notification"



const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext)

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">ChatRoom</Link>
        </h2>
        {
          user &&
          (<span className="text-warning">Hello {user?.data.name}</span>)
        }
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {
              user ?
                (<>
                  <Notification />
                  < Link
                    onClick={() => logoutUser()} to="/signin" className="link-light text-decoration-none">
                    Logout
                  </Link>
                </>)
                :
                (<>
                  < Link to="/signin" className="link-light text-decoration-none">
                    Signin
                  </Link>
                  <Link to="/signup" className="link-light text-decoration-none">
                    Signup
                  </Link>
                </>)

            }
          </Stack>
        </Nav>
      </Container>
    </Navbar >
  )
}

export default NavBar
