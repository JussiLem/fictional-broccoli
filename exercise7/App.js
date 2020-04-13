import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  View,
  TextInput,
  Button
} from 'react-native';

export default () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('')
  const getRecipesFromApi = async () => await fetch(`http://www.recipepuppy.com/api/?i=${keyword}`)
    .then(response => response.json())
    .then(json => setData(json.results))
    .catch(error => console.error(error));

  return (
    <SafeAreaView style={styles.container} behavior={'padding'} enabled>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({item}) =>
          <View>
            <Text>{item.title}</Text>
            <Image style={styles.img}
                   source={{uri: item.thumbnail}}/>
          </View>
        }/>
      <TextInput
        style={styles.textInput}
        onChangeText={(keyword) => setKeyword(keyword)}
      />
      <View style={styles.buttons}>
        <Button onPress={getRecipesFromApi} title="Find"/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 70,
    height: 70
  },
  list: {
    marginTop: 50,
    paddingVertical: 4,
    margin: 5
  },
  textInput: {
    borderBottomWidth: 3,
    marginVertical: 10,
    borderColor: 'black',
    width: 200,
  },

  buttons: {
    marginBottom: 50
  },
});
