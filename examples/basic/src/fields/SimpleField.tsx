import { IWrappedFieldProps, field } from '../../../../lib';
import { mapErrors } from '../Error';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export interface ISimpleFieldProps {
  type: string;
}

export const SimpleField = field(
  observer<ISimpleFieldProps & IWrappedFieldProps>(
    ({ field, type, name }) => (
      <FormGroup validationState={field.errors.length ? 'error' : undefined}>
        {name && <ControlLabel>{name}</ControlLabel>}
        <FormControl type={type} {...field.asProps} />
        {mapErrors(field.errors)}
      </FormGroup>
    )
  )
);
