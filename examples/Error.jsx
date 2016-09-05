import React, { PropTypes } from 'react';

const errorStyles = {
  color: 'rgb(244, 67, 54)',
  'margin-bottom': '5px'
};

const Error = ({ msg }) => (<div style={errorStyles}>{msg}</div>);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Error;
