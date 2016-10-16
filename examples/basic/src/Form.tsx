import { Field, FormStore } from '../../../lib';
import Error from './Error';
import MyField from './Field';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

interface IFormProps {
  form: FormStore;
  onSubmit: () => void;
}

const Form = observer(({ form, onSubmit }: IFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Field name='email' type='text' component={MyField} />
      <Field name='password' type='password' component={MyField} />
      <p>Form JSON: {JSON.stringify(form.fieldValues, null, 2)}</p>
      <button type='submit' disabled={form.submitting}>
        Log In
      </button>
      {mapErrors(form.errors)}
    </form>
  );
});

export default Form;
