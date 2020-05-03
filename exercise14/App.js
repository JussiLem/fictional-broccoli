import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddressList from "./AddressList";
import Map from "./Map";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="AddressList">
      <Stack.Screen name="AddressList" component={AddressList}/>
      <Stack.Screen name="Map" component={Map}/>
    </Stack.Navigator>
  </NavigationContainer>
)
