import { meta } from '../../../../lib';
import { mapErrors } from '../Error';
import * as React from 'react';

export const BaseErrors = meta(
  ({ field }) => (
    <div>{mapErrors(field.errors)}</div>
  )
);
