import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { Field } from '../../src';

test('throws an error with no component', t => {
  const error = t.throws(() => shallow(<Field />), Error);
  t.is(error.message, 'component prop is required');
});

test('throws an error when it is not used inside a formobx wrapped component', t => {
  const error = t.throws(
    () => shallow(<Field component={() => (<div></div>)} />),
    Error
  );
  t.is(error.message, 'formobx Fields must be used inside a formobx wrapped component');
});
