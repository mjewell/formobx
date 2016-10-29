import { ArrayField, IWrappedFormProps, ObjectField } from '../../../lib';
import Error from './Error';
import { ComplexField, ComplexFieldWrapper } from './fields/ComplexField';
import { SimpleField, SimpleFieldWrapper } from './fields/SimpleField';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

export interface IFormProps {
  title: string;
}

const Form = observer<IFormProps & IWrappedFormProps>(
  ({ form, onSubmit, title }) => (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      <SimpleFieldWrapper name='email' type='text' component={SimpleField} />
      <SimpleFieldWrapper name='password' type='password' component={SimpleField} />
      <ObjectField name='nested'>
        <ComplexFieldWrapper names={['original', 'upcased']} type='text' component={ComplexField} />
      </ObjectField>
      <ArrayField name='array'>
        <SimpleFieldWrapper type='text' component={SimpleField} />
        <SimpleFieldWrapper type='text' component={SimpleField} />
        <ObjectField>
          <SimpleFieldWrapper name='whatever' type='text' component={SimpleField} />
        </ObjectField>
      </ArrayField>
      <p>Form JSON: {JSON.stringify(form.value, null, 2)}</p>
      <button type='submit' disabled={form.submitting}>
        Log In
      </button>
      {mapErrors(form.errors)}
    </form>
  )
);

export default Form;
