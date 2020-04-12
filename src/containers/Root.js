import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';

export default class Root extends Component {

  render() {
    const { store, history } = this.props;

    const isDevEnv = process.env.NODE_ENV === 'development';
    const rootS = {
      height: '100%'
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={rootS}>
            <App></App>

            {isDevEnv &&
              <div>
              </div>
            }
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
