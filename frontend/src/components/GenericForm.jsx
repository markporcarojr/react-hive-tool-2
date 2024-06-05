import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const GenericForm = ({ fields, initialValues, onSubmit, buttonText }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit} id="generic-form">
      {fields.map((field) => (
        <div key={field.name} className="m-3 fs-3 mt-0 fw-semibold">
          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
          {field.type === "select" ? (
            <Form.Select
              id={field.name}
              value={values[field.name] || ""}
              onChange={handleChange}
              name={field.name}
              className="bg-inputgrey text-center text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type={field.type}
              id={field.name}
              name={field.name}
              value={values[field.name] || ""}
              onChange={handleChange}
              className="bg-inputgrey text-white text-center border-3 border-michgold rounded-4 opacity-85 fw-bold"
            />
          )}
        </div>
      ))}
      <Button
        type="submit"
        form="generic-form"
        className="btn btn-michgold fw-bold rounded-pill"
      >
        {buttonText}
      </Button>
    </Form>
  );
};

export default GenericForm;
