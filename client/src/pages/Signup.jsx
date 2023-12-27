import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const Signup = () => {
  const { signupInfo, updateSignupInfo, signupUser, signupError, isSignupLoading } = useContext(AuthContext)

  return (
    <Form onSubmit={signupUser}>
      <Row style={{
        height: "100vh",
        justifyContent: "center",
        paddingTop: "10%"
      }}>
        <Col xs={6}>
          <Stack gap={3}>

            <h2 className="text-center">Signup</h2>

            <Form.Control className="my-1 form-control-lg" type="text" placeholder="Name" onChange={(e) => updateSignupInfo({ ...signupInfo, name: e.target.value })} />
            <Form.Control className="my-1 form-control-lg" type="email" placeholder="Email" onChange={(e) => updateSignupInfo({ ...signupInfo, email: e.target.value })} />
            <Form.Control className="my-1 form-control-lg" type="password" placeholder="Password" onChange={(e) => updateSignupInfo({ ...signupInfo, password: e.target.value })} />
            <Form.Control className="my-1 form-control-lg" type="password" placeholder="ConfirmPassword" onChange={(e) => updateSignupInfo({ ...signupInfo, confirmPassword: e.target.value })} />
            <Button className="btn-primary mt-2 btn-lg" type="submit">
              {isSignupLoading ? "Loading" : "Signup"}
            </Button>
            {
              signupError?.error && <Alert className="bg-danger">
                <p className="text-light">{signupError.message}</p>
              </Alert>
            }
          </Stack>
        </Col>
      </Row>
    </Form>
  )
}

export default Signup
