import * as React from 'react';
import MyStack from "./components/Navigator";
import {NavigationContainer} from '@react-navigation/native';

export default () => {
  return <NavigationContainer>
      <MyStack/>
  </NavigationContainer>;
}

