import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import formobx from '../src/formobx';

const dummyComponent = () => (<div></div>);

test('passes all props through to the decorated component', t => {
  const Form = formobx(dummyComponent);
  const props = { a: 'b', c: 'd', e: 'f' };
  const wrapper = mount(<Form {...props} />);
  const wrappedComponents = wrapper.find(dummyComponent);
  t.is(wrappedComponents.length, 1);
  const passedProps = wrappedComponents.first().props();
  t.is(passedProps.a, 'b');
  t.is(passedProps.c, 'd');
  t.is(passedProps.e, 'f');
  t.is(passedProps.onSubmit, undefined);
});

test('passes the form store through to the decorated component', t => {
  const Form = formobx(dummyComponent);
  const wrapper = mount(<Form />);
  const wrappedComponents = wrapper.find(dummyComponent);
  t.is(wrappedComponents.length, 1);
  const passedProps = wrappedComponents.first().props();
  t.is(passedProps.form, wrapper.instance().store);
});

test('passes the wrapped onSubmit function to the decorated component', t => {
  const Form = formobx(dummyComponent, {
    onSubmit: () => {}
  });
  const wrapper = mount(<Form />);
  const wrappedComponents = wrapper.find(dummyComponent);
  t.is(wrappedComponents.length, 1);
  const passedProps = wrappedComponents.first().props();
  t.is(typeof passedProps.onSubmit, 'function');
});

test('sets the form store context', t => {
  const Form = formobx(dummyComponent);
  const wrapper = mount(<Form />);
  t.is(
    wrapper.instance().getChildContext().formStore,
    wrapper.instance().store
  );
});
