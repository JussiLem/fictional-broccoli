import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  SafeAreaView
} from 'react-native';
import {Header, ListItem} from 'react-native-elements';

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('shoplist.db');

export default () => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shoplist (id integer primary key' +
        ' not null, product text, amount text);');
    }, null, updateList);
  }, [])


  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM shoplist;', [], (_, { rows}) =>
        setData(rows._array)
      );

    });
  }
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO shoplist (product, amount) VALUES (?, ?);',
        [product, amount]);
    }, null, updateList);
  }

  const deleteItem = id => {
    db.transaction(tx => {
      tx.executeSql('delete from shoplist where id = ?;',
        [id]);
    }, null, updateList);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{text: 'SHOPPING LIST'}}
      />
      <View style={styles.textStyles}>
        <TextInput
          placeholder={'PRODUCT'}
          style={styles.inputStyles}
          value={product}
          onChangeText={item => setProduct(item)}
        />
        <TextInput
          placeholder={'AMOUNT'}
          value={amount}
          style={styles.inputStyles}
          onChangeText={item => setAmount(item)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button raised icon={{name: 'save'}} onPress={saveItem} title='ADD' />
      </View>
       <FlatList contentContainerStyle={{marginTop: 30}}
                  keyExtractor={item => item.id.toString()}
                  data={data}
                  renderItem = {({item}) => (
                    <ListItem
                      title={item.product}
                      subtitle={item.amount}
                      rightTitle='Bought'
                      bottomDivider
                      chevron={{color: 'black'}}
                      onPress={() => deleteItem(item.id)}
                    />
                  )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  textStyles: {
    marginTop: 50,
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
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
