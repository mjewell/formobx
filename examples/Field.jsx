import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import map from 'lodash/fp/map';
import Error from './Error';

const mapErrors = map(error => <Error msg={error} />);

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

Field.propTypes = {
  field: PropTypes.object.isRequired,
  type: PropTypes.string,
  name: PropTypes.string
};

export default Field;
