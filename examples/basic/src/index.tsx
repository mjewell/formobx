import App from './App';
import * as React from 'react';
import { render } from 'react-dom';
const { AppContainer } = require('react-hot-loader');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

// tslint:disable-next-line:no-reserved-keywords
declare const module: { hot: any };

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
