import { form } from '../../../lib';
import Form from './Form';
import * as Promise from 'bluebird';

export default form(Form, {
  initialValues: {
    email: 'my@email.com',
    nested: {
      original: 'test',
      upcased: 'TEST'
    }
  },
  onSubmit: () => Promise.delay(500).then(() => {
    throw {
      _base: ['the form has some issues'],
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      nested: {
        // TODO: handle _base errors here
        original: ['inside nested object errors too']
      }
    };
  })
});
