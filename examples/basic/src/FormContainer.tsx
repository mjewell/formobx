import { formobx } from '../../../lib';
import Form from './Form';
import * as Promise from 'bluebird';

export default formobx(Form, {
  initialValues: {
    email: 'my@email.com',
    nested: {
      original: 'test',
      upcased: 'TEST'
    }
  },
  onSubmit: () => Promise.delay(1000).then(() => {
    throw {
      _base: ['the form has some issues'],
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      nested: {
        original: ['nested errors too']
      }
    };
  })
});
