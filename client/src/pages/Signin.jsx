import { useContext } from "react"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"

const Signin = () => {
  const { signinInfo, updateSigninInfo, signinUser, signinError, isSigninLoading } = useContext(AuthContext)
  return (
    <Form onSubmit={signinUser}>
      <Row style={{
        height: "100vh",
        justifyContent: "center",
        paddingTop: "10%"
      }}>
        <Col xs={6}>
          <Stack gap={3}>

            <h2 className="text-center">Signin</h2>

            <Form.Control className="my-1 form-control-lg" type="email" placeholder="Email" onChange={(e) => updateSigninInfo({ ...signinInfo, email: e.target.value })} />
            <Form.Control className="my-1 form-control-lg" type="password" placeholder="Password" onChange={(e) => updateSigninInfo({ ...signinInfo, password: e.target.value })} />

            <Button className="btn-primary mt-2 btn-lg" type="submit">
              {isSigninLoading ? "Loading" : "Signin"}
            </Button>
            {
              signinError?.error && <Alert className="bg-danger">
                <p className="text-light">{signinError.message}</p>
              </Alert>
            }

          </Stack>
        </Col>
      </Row>
    </Form>
  )
}
export default Signin
