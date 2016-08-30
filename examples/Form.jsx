import React, { PropTypes } from 'react';

const Form = ({
  fields: { email, password },
  errors,
  onSubmit,
  submitting
}) => {
  return (
    <form onSubmit={onSubmit}>

      <label>Email: </label>
      <input {...email} />
      <div>{errors.email}</div>

      <label>Password: </label>
      <input type="password" {...password} />
      <div>{errors.password}</div>

      <button type="submit" disabled={submitting}>
        Log In
      </button>
      <div>{errors._base}</div>

    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.shape({
    email: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default Form;
