import React from 'react';
import {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default () => {
  const [text, setText] = useState(0);
  const [text2, setText2] = useState(0);
  const [result, SetResult] = useState(0);
  const plus = () => SetResult(Number(text) + Number(text2));
  const minus = () => SetResult(Number(text) - Number(text2));
  return (
    <View style={styles.container}>
      <Text>
        Result: {result}
      </Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => setText(text)}
        keyboardType={'numeric'}
      />

      <TextInput
        style={styles.textInputStyle}
        onChangeText={text2 => setText2(text2)}
        keyboardType={'numeric'}
      />
      <View style={styles.buttonStyle}>
        <Button onPress={() => plus()} title="+"/>
        <Button onPress={() => minus()} title="-"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textInputStyle: {
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688',
    marginBottom: 10
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    height: 40
  }
});
