import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { login } from "../../api";

function Login({ onLoginSuccessful }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    setHasError(false);
    const loginResult = await login({ email, password });
    if (!loginResult) setHasError(true);
    else {

      console.log(loginResult)
      localStorage.setItem("name", loginResult["data"]["email"]);
      localStorage.setItem("token", loginResult["token"]);
      onLoginSuccessful();
    }
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h1">Login</Card.Header>
        <Card.Body>
          <Form className="w-100" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
                value={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordChange}
                value={password}
              />
            </Form.Group>
            {hasError && (
              <Alert variant={"danger"}>
                The email address and password you entered don't match any
                account. Please try again.
              </Alert>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
