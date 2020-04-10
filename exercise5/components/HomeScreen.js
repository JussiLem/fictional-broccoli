import * as React from 'react';
import { View, Text, Button } from 'react-native';

export const HomeScreen = ({ navigation }) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Calculator..."
      onPress={() => navigation.push('Calculator')}
    />
    <Button title="Go to History" onPress={() => navigation.navigate('History')} />
  </View>
);
