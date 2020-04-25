import React, {useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default () => {
  const [lat, setLat] = useState(60.201373)
  const [lng, setLng] = useState(24.934041)
  const [address, setAddress] = useState('')
  const [restaurants, setRestaurants] = useState([])
  Geocoder.init('GoogleAPiKey ')

  const findRestaurants = async () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=GoogleAPiKey`
    console.log(url)
    await fetch(url)
      .then(response => response.json())
      .then(json => {
        setRestaurants(json.results)
      })
      .catch((title, message) => Alert.alert("Something went wrong", message))
  };

  const findLocation = async () => {
    await Geocoder.from(address)
      .then(json => {
        setLng(json.results[0].geometry.location.lng)
        setLat(json.results[0].geometry.location.lat)
      })
      .catch(e => console.warn(e));
  }

  const find = async () => {
    await Promise.all([
      await findLocation(),
      await findRestaurants()
    ])
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{
          flex: 8,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        {restaurants.map(marker => (
          <Marker
            key={marker.id}
            title={marker.name}
            description={marker.vicinity}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng
            }}
          />
        ))}
      </MapView>
      <TextInput style={styles.textInput}
                 onChangeText={address => setAddress(address)}/>
      <Button style={styles.button} onPress={find} title="Find Restaurants"/>
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
  map: {
    flex: 8
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
    borderBottomWidth: 4,
    backgroundColor: 'white',
    width: '100%',
  },
  button: {
    alignSelf: 'stretch',
    width: 200,
    alignItems: 'center'
  },
});
