import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { Field } from '../lib';
import MyField from './Field';
import Error from './Error';

const Form = observer(({ form, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Field name="email" type="text" component={MyField} />
      <Field name="password" type="password" component={MyField} />
      <p>Form JSON: {JSON.stringify(form.fieldValues, null, 2)}</p>
      <button type="submit" disabled={form.submitting}>
        Log In
      </button>
      {_.map(form.errors, error => <Error msg={error} />)}
    </form>
  );
});

Form.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
};

export default Form;
