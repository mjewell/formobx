import React from 'react';
import _ from 'lodash';

const errorStyles = {
  color: 'rgb(244, 67, 54)',
  'margin-bottom': '5px'
};

const defaultError = 'Something went wrong, please try again later';

export default errors => {
  if (typeof errors === 'object') {
    return _.mapValues(errors, errorArray => {
      return errorArray.map(error => {
        return <div key={error} style={errorStyles}>{error}</div>;
      });
    });
  } else if (typeof errors === 'string') {
    return {
      _base: [<div key="error" style={errorStyles}>{errors}</div>]
    };
  }
  return {
    _base: [<div key="error" style={errorStyles}>{defaultError}</div>]
  };
};
