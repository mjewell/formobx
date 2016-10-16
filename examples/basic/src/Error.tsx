import * as React from 'react';

const errorStyles = {
  color: 'rgb(244, 67, 54)',
  'margin-bottom': '5px'
};

const Error = ({ msg }: { msg: string }) => (<div style={errorStyles}>{msg}</div>);

export default Error;
