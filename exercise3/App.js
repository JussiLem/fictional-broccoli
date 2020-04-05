import React from 'react';
import {useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from 'react-native';


export default () => {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [result, setResult] = useState(0);
  const [data, setData] = useState([]);

  const plus = () => {
    const summary = (Number(value) + Number(value2));
    const item = `${value} + ${value2} = ${summary}`;
    setResult(summary);
    setData([...data, {key: item}]);

  };
  const minus = () => {
    const summary = (Number(value) - Number(value2));
    const item = `${value} - ${value2} = ${summary}`;
    setResult(summary);
    setData([...data, {key: item}]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Result: {result}
      </Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={e => setValue(e)}
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={e => setValue2(e)}
        keyboardType={'numeric'}
      />
      <View style={styles.buttonStyle}>
        <Button onPress={() => plus()} title="+"/>
        <Button onPress={() => minus()} title="-"/>
      </View>
      <TextInput>
        History
      </TextInput>
      <FlatList
        data={data}
        renderItem={({item}) =>
          <Text>
            {item.key}
          </Text>
        }/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
  }
});
