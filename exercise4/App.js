import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  SafeAreaView
} from 'react-native';

export default function App() {
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const addItem = () => setData([...data, {key: item}]);
  const clear = () => setData([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textStyles}>
        <TextInput
          style={styles.inputStyles}
          onChangeText={(item) => setItem(item)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button onPress={addItem} title="Add"/>
        <Button onPress={clear} title="Clear"/>
      </View>

      <Text>Shopping List:</Text>
      <View style={styles.shoppingStyle}>
        <FlatList
          data={data}
          renderItem={({item}) =>
            <Text>{item.key}</Text>
          }/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 130
  },
  textStyles: {
    alignItems: 'center'
  },
  inputStyles: {
    borderColor: '#333',
    width: 200,
    height: 40,
    borderWidth: 2,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shoppingStyle: {
    alignItems: 'center'
  }
});
