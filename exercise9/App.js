import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

//AIzaSyD6gzrSIY-oYtmvxBjCDgm6wzQpSinHCiQ
export default () => {
  const [lat, setLat] = useState(60.1098678)
  const [lng, setLng] = useState(24.7385121)
  const [address, setAddress] = useState('')
  Geocoder.init('AIzaSyD6gzrSIY-oYtmvxBjCDgm6wzQpSinHCiQ', {language: "fi"})
  const findLocation = async () => {
    Geocoder.from(address)
      .then(json => {
        const location = json.results[0].geometry.location
        setLat(location.lat)
        setLng(location.lng)
      })
      .catch(e => console.warn(e))
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
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
        />
      </MapView>
      <TextInput style={styles.textInput}
                 onChangeText={(address) => setAddress(address)}/>
      <Button style={styles.button} onPress={findLocation} title="Find"/>
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
