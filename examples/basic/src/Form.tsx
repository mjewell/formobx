import { ArrayField, IWrappedFormProps, ObjectField, field } from '../../../lib';
import Error from './Error';
import { ComplexField } from './fields/ComplexField';
import { SimpleField } from './fields/SimpleField';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
const JSONTree = require('react-json-tree').default;
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

export interface IFormProps {
    title: string;
}

const nestedArrayFields = observable<number>([]);
const InputField = field<{ type: string }>('input');

const Form = observer<IFormProps & IWrappedFormProps>(
    ({ form, onSubmit, title }) => {
        return (
            <form onSubmit={onSubmit}>
                <h1>{title}</h1>
                <InputField name='test' type='text' />
                <SimpleField name='email' type='text' />
                <SimpleField name='password' type='password' />
                <ObjectField name='nested'>
                    <ComplexField names={['original', 'upcased']} type='text' />
                </ObjectField>
                <ArrayField name='array'>
                    <SimpleField type='text' />
                    <ObjectField>
                        <SimpleField name='whatever' type='text' />
                    </ObjectField>
                    <ArrayField>
                        {nestedArrayFields.map((x, i) => <SimpleField key={i} type='text' />)}
                        <a href='#' onClick={() => nestedArrayFields.push(1)}>Add Another</a>
                    </ArrayField>
                </ArrayField>
                <JSONTree data={form.value} shouldExpandNode={() => true} />
                <button type='submit' disabled={form.submitting}>
                    Log In
        </button>
                {mapErrors(form.errors)}
            </form>
        );
    }
);

export default Form;
