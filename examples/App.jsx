import React from 'react';
import DevTools from 'mobx-react-devtools';
import FormContainer from './FormContainer';

const App = () => {
  return (
    <div>
      <FormContainer />
      <DevTools />
    </div>
  );
};

export default App;
