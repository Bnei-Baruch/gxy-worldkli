import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import { OidcProvider } from 'redux-oidc';
import userManager from '../utils/userManager';

export default class Root extends Component {

  render() {
    const { store, history } = this.props;

    const isDevEnv = process.env.NODE_ENV === 'development';
    const rootS = {
      height: '100%'
    }

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <ConnectedRouter history={history}>
            <div style={rootS}>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;700&display=swap');
              </style>
              <App></App>

              {isDevEnv &&
                <div>
                </div>
              }
            </div>
          </ConnectedRouter>
        </OidcProvider>
      </Provider>
    );
  }
}
