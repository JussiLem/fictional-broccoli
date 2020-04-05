import React from 'react';
import {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

export default function App() {
  const [raffle, setRaffle] = useState(0);
  useEffect(() => {
    setRaffle(Math.floor(Math.random() * 100) + 1);
  }, []);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const makeGuess = () => {
    setCount(count + 1);
    if (guess < raffle) {
      setResult(`Your guess ${guess} is too low`)
    } else if (guess > raffle) {
      setResult(`Your guess ${guess} is too high`)
    } else {
      Alert.alert(`You guessed the number in ${count} guesses`)
    }
  };

  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={e => setGuess(e)}
        value={guess}
        keyboardType={'numeric'}
      />
      <View style={styles.buttonStyle}>
        <Button onPress={() => makeGuess()} title="MAKE GUESS"/>
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
