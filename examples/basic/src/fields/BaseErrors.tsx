import { IWrappedMetaProps, meta } from '../../../../lib';
import { mapErrors } from '../Error';
import { observer } from 'mobx-react';
import * as React from 'react';

export const BaseErrors = meta(
  observer<IWrappedMetaProps>(
    ({ field }) => (
      <div>{mapErrors(field.errors)}</div>
    )
  )
);
