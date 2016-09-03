import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

const Field = observer(({ field, type, name }) => (
  <div>
    <label>{name}: </label>
    <input
      onChange={e => field.updateValue(e.target.value)}
      defaultValue={field.value}
      type={type}
    />
    <p>Preview: {field.value}</p>
  </div>
));

Field.propTypes = {
  field: PropTypes.object.isRequired,
  type: PropTypes.string,
  name: PropTypes.string
};

export default Field;
