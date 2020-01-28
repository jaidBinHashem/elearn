/**
 * @format
 */
import React from "react";
import { AppRegistry, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import App from './app/routes';
import { name as appName } from './app.json';

// Redux and saga Start
import { Provider } from "react-redux";
import store from './app/redux/store'
// Redux and saga End

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

YellowBox.ignoreWarnings(['Require cycle:', 'ViewPagerAndroid', 'componentWillReceiveProps', 'VirtualizedLists', 'componentWillMount']);
AppRegistry.registerComponent(appName, () => AppContainer);
