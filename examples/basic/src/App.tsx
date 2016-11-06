import { Form } from './Form';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';

const App = () => {
  return (
    <div style={{ margin: 'auto', maxWidth: '900px' }}>
      <Form title='Demo' />
      <DevTools />
    </div>
  );
};

export default App;
