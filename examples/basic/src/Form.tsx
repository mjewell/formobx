import { IWrappedFormProps, Section } from '../../../lib';
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
  ({form, onSubmit, title }) => (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      <SimpleFieldWrapper name='email' type='text' component={SimpleField} />
      <SimpleFieldWrapper name='password' type='password' component={SimpleField} />
      <Section name='test'>
        <ComplexFieldWrapper name='complex' type='text' component={ComplexField} />
      </Section>
      <p>Form JSON: {JSON.stringify(form.value, null, 2)}</p>
      <button type='submit' disabled={form.submitting}>
        Log In
      </button>
      {mapErrors(form.errors)}
    </form>
  )
);

export default Form;
