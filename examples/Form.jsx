import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import map from 'lodash/fp/map';
import { Field } from '../lib';
import MyField from './Field';
import Error from './Error';

const mapErrors = map(error => <Error msg={error} />);

const Form = observer(({ form, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Field name="email" type="text" component={MyField} />
      <Field name="password" type="password" component={MyField} />
      <p>Form JSON: {JSON.stringify(form.fieldValues, null, 2)}</p>
      <button type="submit" disabled={form.submitting}>
        Log In
      </button>
      {mapErrors(form.errors)}
    </form>
  );
});

Form.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default Form;
