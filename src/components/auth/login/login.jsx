import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailRef.current.value.length) {
      setErrors({ ...errors, email: true });
      alert("Email vacío");
      emailRef.current.focus();
      return;
    }

    if (!password.length || password.length < 7) {
      setErrors({ ...errors, password: true });
      alert("Password vacío o muy corto");
      passwordRef.current.focus();
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.message}`);
        return;
      }

      const token = await res.json();
      console.log("Token recibido:", token); // ✅ Esto mostrará el JWT en consola

      localStorage.setItem("book-champions-token", token); // ✅ IMPORTANTE: bien escrito

      onLogin(); // cambia el estado en App.jsx
      navigate("/library");
    } catch (err) {
      console.error("Error en login:", err);
      alert("Hubo un error al intentar iniciar sesión");
    }
  };


  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="mt-5 mx-3 p-3 px-5 shadow">
        <Card.Body>
            <Row className="mb-2">
              <h5>¡Bienvenidos a Books Champion!</h5>
            </Row>
            <Form onSubmit={handleLogin}>
              <FormGroup className="mb-4">
                <Form.Control
                  type="text"
                  className={`input-email ${errors.email ? "border border-danger" : ""}`}
                  placeholder="Ingresar email"
                  onChange={handleEmailChange}
                  value={email}
                  ref={emailRef}
                />
                {errors.email && <p className="text-danger">El campo email es obligatorio</p>}
              </FormGroup>
              <FormGroup className="mb-4">
                <Form.Control
                  type="password"
                  required
                  ref={passwordRef}
                  placeholder="Ingresar contraseña"
                  onChange={handlePasswordChange}
                  value={password}
                />
                {errors.password && (
                  <p className="text-danger">
                    La contraseña debe tener al menos 7 caracteres
                  </p>
                )}
              </FormGroup>
              <Row>
                <Col />
                <Col md={6} className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    type="submit"
                    size="lg"
                    className="px-5 py-2 w-100"
                  >
                    Iniciar sesión
                  </Button>
                </Col>
              </Row>
              <Row className="mt-4">
                <p className="text-center fw-bold">¿Aun no tienes cuenta?</p>
                <Button onClick={handleRegisterClick}>Registrarse</Button>
              </Row>
            </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;