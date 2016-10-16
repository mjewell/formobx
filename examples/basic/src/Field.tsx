import Error from './Error';
import { observer } from 'mobx-react';
import * as React from 'react';
const map = require('lodash/fp/map');

const mapErrors = map((error: string) => <Error msg={error} />);

const Field = observer(({ field, type, name }) => (
  <div>
    <label>{name}: </label>
    <input
      {...field.asProps}
      type={type}
      />
    {mapErrors(field.errors)}
    <p>Preview: {field.value}</p>
  </div>
));

export default Field;
