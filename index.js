/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './app/routes';
import {name as appName} from './app.json';

// Redux and saga Start
import { Provider } from "react-redux";
import store from './app/redux/store'
// Redux and saga End

const AppContainer = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => AppContainer);
