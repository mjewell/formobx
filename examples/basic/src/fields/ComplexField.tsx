import { IWrappedFieldProps, createFieldWrapper } from '../../../../lib';
import Error from '../Error';
import * as toUpper from 'lodash/toUpper';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

export interface IComplexFieldProps {
  type: string;
}

export const ComplexField = observer<IComplexFieldProps & IWrappedFieldProps>(
  ({ field, type, name }) => (
    <div>
      <label>{name}: </label>
      <input
        defaultValue={field.value && field.value.original}
        onChange={(e: any) => field.setValue({ original: e.target.value, upcased: toUpper(e.target.value) })}
        type={type}
        />
      {mapErrors(field.errors)}
      <p>Preview: {JSON.stringify(field.value, null, 2)}</p>
    </div>
  )
);

export const ComplexFieldWrapper = createFieldWrapper<IComplexFieldProps>();
