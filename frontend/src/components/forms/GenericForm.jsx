import { Button, Form } from "react-bootstrap";

import { useForm } from "react-hook-form";

const GenericForm = ({ fields, initialValues, onSubmit, buttonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || {}, // Set default values
  });

  const handleChange = (e) => {
    e.preventDefault(); // Not needed here, form submission handled by handleSubmit
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* ... your form fields with register and errors */}
      {fields.map((field) => (
        <div key={field.name} className="m-3 fs-3 mt-0 fw-semibold">
          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
          {field.type === "select" ? (
            <Form.Select
              {...register(field.name)} // Use register for fields
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
              {...register(field.name)} // Use register for fields
              type={field.type}
              className="bg-inputgrey text-white text-center border-3 border-michgold rounded-4 opacity-85 fw-bold"
            />
          )}
          {errors[field.name] && ( // Display errors from formState
            <p className="text-danger">{errors[field.name].message}</p>
          )}
        </div>
      ))}
      <Button type="submit" className="btn btn-michgold fw-bold rounded-pill">
        {buttonText}
      </Button>
    </Form>
  );
};

export default GenericForm;
