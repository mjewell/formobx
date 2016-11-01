import { IWrappedMultiFieldProps, multiField } from '../../../../lib';
import Error from '../Error';
import * as toUpper from 'lodash/toUpper';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

export interface IComplexFieldProps {
  type: string;
}

export const ComplexField = multiField(
  observer<IComplexFieldProps & IWrappedMultiFieldProps>(
    ({ fields: { original, upcased }, type, names }) => (
      <div>
        <label>{(names || []).join(' & ')}: </label>
        <input
          value={original.value}
          onChange={(e: any) => { original.setValue(e.target.value); upcased.setValue(toUpper(e.target.value)); } }
          type={type}
          />
        {mapErrors(original.errors)}
        {mapErrors(upcased.errors)}
      </div>
    )
  )
);
