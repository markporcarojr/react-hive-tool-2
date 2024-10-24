import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import logoPng1x from "../../assets/images/hive_tool@1x.png";
import logoWebp1x from "../../assets/images/hive_tool@1x.webp";
import logoPng2x from "../../assets/images/hive_tool@2x.png";
import logoWebp2x from "../../assets/images/hive_tool@2x.webp";
import logoPng3x from "../../assets/images/hive_tool@3x.png";
import logoWebp3x from "../../assets/images/hive_tool@3x.webp";

const AuthForm = ({
  formFields,
  initialData,
  onSubmit,
  message,
  buttonText,
  linkText,
  linkHref,
  isLogin,
  onGuestLogin,
}) => {
  const [form, setForm] = useState(initialData);
  const [showPassword, setShowPassword] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Container className="mt-5" fluid style={{ maxWidth: "700px" }}>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="justify-content-center mb-0">
          <div className="d-flex justify-content-center">
            <picture className="rotateY">
              <source
                type="image/webp"
                srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
              />
              <img
                className="pop"
                src={logoPng1x}
                alt=""
                srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
              />
            </picture>
          </div>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} className="text-center">
            <p
              style={{
                color:
                  message === "User was registered successfully."
                    ? "#ffcb05"
                    : "#ab0a0a",
                textAlign: "center",
              }}
            >
              {message}
            </p>
            {formFields.map((field, index) => (
              <Form.Group
                controlId={field.name}
                key={index}
                className="position-relative"
              >
                <Form.Control
                  type={
                    field.type === "password" && showPassword[field.name]
                      ? "text"
                      : field.type
                  }
                  autoComplete={field.autoComplete}
                  value={form[field.name]}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="text-center bg-white text-black border-3 border-michgold rounded-4 fw-bold"
                  onChange={handleChange}
                />
                {field.type === "password" && (
                  <FontAwesomeIcon
                    icon={showPassword[field.name] ? faEye : faEyeSlash}
                    onClick={() => handleTogglePassword(field.name)}
                    className="eye-icon"
                  />
                )}
              </Form.Group>
            ))}
            <Form.Group>
              <Button
                type="submit"
                className="btn-michgold btn-gold rounded-pill px-4 mt-3 mb-2 "
              >
                {buttonText}
              </Button>
              {isLogin && (
                <div>
                  <Row className="justify-content-center mb-3">
                    <Col xs={12} sm={10} md={8} lg={6}>
                      <Button
                        type="button"
                        className="btn-michgold btn-gold rounded-pill px-3 text-center"
                        onClick={onGuestLogin}
                      >
                        GUEST LOGIN
                      </Button>
                    </Col>
                  </Row>
                </div>
              )}
              <a
                href={linkHref}
                className="d-block text-center fs-4 text-michgold mb-2 link darken-on-hover"
              >
                {linkText}
              </a>
              {isLogin && (
                <a
                  href="/forgot-password"
                  className="d-block text-center fs-4 text-michgold mb-3 link darken-on-hover"
                >
                  Forgot Password?
                </a>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AuthForm;
