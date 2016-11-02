import FormContainer from './FormContainer';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';

const App = () => {
  return (
    <div style={{ margin: 'auto', maxWidth: '900px' }}>
      <FormContainer title='Demo' />
      <DevTools />
    </div>
  );
};

export default App;
