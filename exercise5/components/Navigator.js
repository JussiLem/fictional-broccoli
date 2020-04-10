import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Calculator from './Calculator';
import History from "./History";
import {HomeScreen} from "./HomeScreen";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Calculator" component={Calculator}/>
    <Stack.Screen name="History" component={History}/>
  </Stack.Navigator>
)

