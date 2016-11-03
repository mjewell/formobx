import { form } from '../../../lib';
import Form from './Form';
import * as Promise from 'bluebird';

export default form(Form, {
  initialValues: {
    email: 'my@email.com',
    original: 'test',
    upcased: 'TEST'
  },
  onSubmit: () => Promise.delay(500).then(() => {
    throw {
      _base: ['the form has some issues'],
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      object: {
        _base: ['errors on the object'],
        nestedFieldA: ['and inside the object too']
      },
      array: [
        { arrayField: ['array errors too'] }
      ]
    };
  })
});
