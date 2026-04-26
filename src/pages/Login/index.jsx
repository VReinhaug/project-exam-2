import { useState } from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import LoginForm from "../../auth/LoginForm";
import RegisterForm from "../../auth/RegisterForm";
import "./login.scss";
import "../../styles/_forms.scss";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container className="login-page py-5">
      <h1 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h1>

      <ButtonGroup className="mb-4 w-100">
        <Button
          className={isLogin ? "auth-toggle active" : "auth-toggle"}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
        <Button
          className={!isLogin ? "auth-toggle active" : "auth-toggle"}
          onClick={() => setIsLogin(false)}
        >
          Register
        </Button>
      </ButtonGroup>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Container>
  );
}

export default LoginPage;
