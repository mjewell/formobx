import { ArrayField, IWrappedFormProps, ObjectField } from '../../../lib';
import { mapErrors } from './Error';
import { BaseErrors } from './fields/BaseErrors';
import { ComplexField } from './fields/ComplexField';
import { CustomArrayField } from './fields/CustomArrayField';
import { InputField } from './fields/InputField';
import { SimpleField } from './fields/SimpleField';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, ControlLabel, PageHeader, Panel } from 'react-bootstrap';
const JSONTree = require('react-json-tree').default;

export interface IFormProps {
  title: string;
}

const Form = observer<IFormProps & IWrappedFormProps>(
  ({ form, onSubmit, title }) => {
    return (
      <form onSubmit={onSubmit}>
        <PageHeader>{title}</PageHeader>
        <Panel header='Basic Input Field'>
          <ControlLabel>test</ControlLabel>
          <InputField name='test' type='text' style={{ display: 'block' }} />
        </Panel>

        <Panel header='Custom Input Components'>
          <SimpleField name='email' type='text' />
          <SimpleField name='password' type='password' />
        </Panel>

        <Panel header='Connected Inputs'>
          <ComplexField names={['original', 'upcased']} type='text' />
        </Panel>

        <Panel header='Objects'>
          <ObjectField name='object'>
            <BaseErrors />
            <SimpleField name='nestedFieldA' type='text' />
            <SimpleField name='nestedFieldB' type='text' />
          </ObjectField>
        </Panel>

        <Panel header='Arrays'>
          <ArrayField name='array'>
            <BaseErrors />
            <CustomArrayField />
          </ArrayField>
        </Panel>

        {mapErrors(form.errors)}

        <JSONTree data={form.value} shouldExpandNode={() => true} />

        <Button bsStyle='primary' type='submit' disabled={form.submitting}>
          Log In
        </Button>
      </form>
    );
  }
);

export default Form;
