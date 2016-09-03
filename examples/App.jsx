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
        onSubmit={fields => {
          console.log(fields);
          return Promise.delay(1000);
        }}
      />
      <DevTools />
    </div>
  );
};

export default App;
