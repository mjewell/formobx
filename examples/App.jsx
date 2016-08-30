import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Promise from 'bluebird';
import Form from './Form';
import formobx from '../src/formobx';

const FormContainer = formobx(
  Form,
  ['email', 'password'],
  () => Promise.delay(1000).then(() => {
    throw {
      email: ['is wrong somehow'],
      password: [
        'is not strong enough',
        'and something else'
      ],
      _base: ['the form has some issues']
    };
  })
);

const App = observer(() => (
  <div>
    <FormContainer />
    <DevTools />
  </div>
));

export default App;
