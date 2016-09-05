import React from 'react';
import DevTools from 'mobx-react-devtools';
import Promise from 'bluebird';
import Form from '../src/components/form/component';
import MyForm from './Form';

const App = () => {
  return (
    <div>
      <Form
        component={MyForm}
        onSubmit={() => Promise.delay(1000).then(() => {
          throw {
            email: ['is wrong somehow'],
            password: [
              'is not strong enough',
              'and something else'
            ],
            _base: ['the form has some issues']
          };
        })}
      />
      <DevTools />
    </div>
  );
};

export default App;
