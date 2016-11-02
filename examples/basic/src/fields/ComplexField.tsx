import { IWrappedMultiFieldProps, multiField } from '../../../../lib';
import { mapErrors } from '../Error';
import * as toUpper from 'lodash/toUpper';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export interface IComplexFieldProps {
  type: string;
}

export const ComplexField = multiField(
  observer<IComplexFieldProps & IWrappedMultiFieldProps>(
    ({ fields: { original, upcased }, type, names }) => (
      <FormGroup validationState={original.errors.length || upcased.errors.length ? 'error' : undefined}>
        {names && <ControlLabel>{(names || []).join(' & ')}</ControlLabel>}
        <FormControl
          type={type}
          value={original.value}
          onChange={(e: any) => { original.setValue(e.target.value); upcased.setValue(toUpper(e.target.value)); } }
          />
        {mapErrors(original.errors)}
        {mapErrors(upcased.errors)}
      </FormGroup>
    )
  )
);
