import test from 'ava';
import Store from '../src/store';
import FieldStore from '../src/components/field/store';

test('initial state', t => {
  const store = new Store();
  t.is(store.fields.size, 0);
  t.is(store.submitting, false);
  t.is(store.errors.length, 0);
  t.deepEqual(store.initialValues, {});
});

test('sets initialValues from options', t => {
  const initialValues = {
    email: 'test',
    password: 'pass'
  };
  const store = new Store({ initialValues });
  t.deepEqual(store.initialValues, initialValues);
});

test('can get fields values', t => {
  const store = new Store();
  store.addField('first name', new FieldStore());
  store.addField('last name', new FieldStore());
  store.addField('email', new FieldStore());
  t.deepEqual(store.fieldValues, {
    'first name': '',
    'last name': '',
    email: ''
  });
});

test('can get the fields errors', t => {
  const store = new Store();
  store.addField('first name', new FieldStore());
  store.addField('last name', new FieldStore());
  store.addField('email', new FieldStore());
  store.fields.get('first name').updateErrors(['a']);
  store.fields.get('email').updateErrors(['b']);
  t.deepEqual(store.fieldErrors, {
    'first name': ['a'],
    'last name': [],
    email: ['b']
  });
});

test('can add fields', t => {
  const store = new Store();
  store.addField('email', new FieldStore());
  t.is(store.fields.size, 1);
  t.is(store.fields.get('email').value, '');
  store.addField('password', new FieldStore());
  t.is(store.fields.size, 2);
  t.is(store.fields.get('password').value, '');
});

test('added fields get their values from initialValues', t => {
  const initialValues = { email: 'test@email.com' };
  const store = new Store({ initialValues });
  store.addField('email', new FieldStore());
  store.addField('password', new FieldStore());
  t.is(store.fields.get('email').value, 'test@email.com');
  t.is(store.fields.get('password').value, '');
});

test('can clear all errors', t => {
  const store = new Store();
  store.addField('email', new FieldStore());
  store.addField('password', new FieldStore());
  store.updateErrors(['some error']);
  store.fields.get('email').updateErrors(['some email error', 'some other email error']);
  store.fields.get('password').updateErrors(['some password error']);
  t.deepEqual(store.errors.slice(), ['some error']);
  t.deepEqual(
    store.fields.get('email').errors.slice(),
    ['some email error', 'some other email error']
  );
  t.deepEqual(store.fields.get('password').errors.slice(), ['some password error']);
  store.clearErrors();
  t.deepEqual(store.errors.slice(), []);
  t.deepEqual(store.fields.get('email').errors.slice(), []);
  t.deepEqual(store.fields.get('password').errors.slice(), []);
});
