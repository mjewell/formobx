import { IWrappedFieldProps, field } from '../../../../lib';
import Error from '../Error';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

export interface ISimpleFieldProps {
  type: string;
}

export const SimpleField = field(
  observer<ISimpleFieldProps & IWrappedFieldProps>(
    ({ field, type, name }) => (
      <div>
        <label>{name ? `${name}: ` : undefined}</label>
        <input {...field.asProps} type={type} />
        {mapErrors(field.errors)}
      </div>
    )
  )
);
