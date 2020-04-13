import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Picker,
  TextInput,
  Button,
  Keyboard
} from 'react-native';

export default () => {
  const [amount, setAmount] = useState('')
  const [converted, setConverted] = useState('')
  const [rates, setRates] = useState([])
  const [rate, setRate] = useState('')
  const [index, setIndex] = useState('')
  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => await fetch(`http://data.fixer.io/api/latest?access_key=a3166e817a2c2119804a1ce2e9d241c3&format=1`)
    .then(response => response.json())
    .then(json => setRates(json.rates))
    .catch(e => console.error(e))

  const converter = () => {
    setConverted((Number(amount) / rate).toFixed(2))
    Keyboard.dismiss()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{converted} €</Text>
      <View style={styles.inputPicker}>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(amount) => setAmount(amount)}
        />
        <Picker
          style={styles.picker}
          selectedValue={rate}
          onValueChange={
            (itemValue, itemIndex) => {
              setRate(itemValue);
              setIndex(itemIndex);
            }
          }>
          {Object.keys(rates).map((k) => {
            return <Picker.Item label={k} value={rates[k]} key={index}/>
          })
          }
        </Picker>
      </View>
      <Button onPress={() => converter()} title="Convert"/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7c4fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 100,
    height: 50
  },
  text: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 20
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderBottomWidth: 5,
    width: 100,
    backgroundColor: '#ffffff70'
  },
  inputPicker: {
    flexDirection: 'row'
  }
});
