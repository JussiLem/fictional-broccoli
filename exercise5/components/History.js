import React from 'react';
import {SafeAreaView, Text, FlatList, StyleSheet} from 'react-native';

export default ({ route, navigation }) => {
  const { history } = route.params
  console.log(JSON.stringify(route.params))
  return (
    <SafeAreaView style={styles.history}>
      <Text>History</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={history}
        keyExtractor={item => item.name}
        renderItem={({item}) =>
          <Text>{item.key}</Text>
        }/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  history: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    justifyContent: 'center'
  }
});
