import Promise from 'bluebird';
import formobx from '../src/formobx';
import Form from './Form';

export default formobx(Form, {
  onSubmit: () => Promise.delay(1000).then(() => {
    throw {
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      _base: ['the form has some issues']
    };
  })
});
