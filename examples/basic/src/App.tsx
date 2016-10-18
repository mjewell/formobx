import FormContainer from './FormContainer';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';

const App = () => {
  return (
    <div>
      <FormContainer title='Basic Example' />
      <DevTools />
    </div>
  );
};

export default App;
