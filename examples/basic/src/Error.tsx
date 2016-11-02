import * as React from 'react';
const map = require('lodash/fp/map');

const errorStyles = {
  color: 'rgb(244, 67, 54)',
  marginBottom: '5px'
};

export const Error = ({ msg }: { msg: string }) => (<div style={errorStyles}>{msg}</div>);

export const mapErrors = map((error: string) => <Error key={error} msg={error} />);
