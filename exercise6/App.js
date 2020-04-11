import React, {useEffect, useState} from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default () => {
  const [raffle, setRaffle] = useState(0);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(99)
  useEffect(() => {
    setRaffle(Math.floor(Math.random() * 100) + 1);
  }, []);

  useEffect(() => {
    setNewHighScore()
  }, [highScore])

  const setNewHighScore = async () => {
    try {
      await AsyncStorage.setItem("@HighScore:key", JSON.stringify(highScore))
    } catch (e) {
      Alert.alert('Error saving data')
    }
  }
  const retrieveHighScore = async () => {
    try {
      return await AsyncStorage.getItem("@HighScore:key")
    } catch (e) {
      Alert.alert('Error saving data')
    }
  }

  const checkAndSetHighScore = async () => {
    const highScore = await retrieveHighScore()
    if (count < highScore) {
      setHighScore(count)
    }
  };

  const makeGuess = () => {
    setCount(count + 1);
    if (guess < raffle) {
      setResult(`Your guess ${guess} is too low`)
    } else if (guess > raffle) {
      setResult(`Your guess ${guess} is too high`)
    } else {
      checkAndSetHighScore()
      Alert.alert(`You guessed the number in ${count} guesses`)
    }
  };

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1-100</Text>
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

      <Text>High Score: {highScore} guesses</Text>
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
