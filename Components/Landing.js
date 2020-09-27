import React, {useState, useEffect} from 'react';
import MapView ,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, requireNativeComponent } from 'react-native';
import * as Location from 'expo-location';
import {getLocation} from '../redux/videoReducer'
import {connect} from 'react-redux'


const Landing =(props)=> {

    const [location, setLocation] = useState([null]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([])
    const [latlng, setLatLng] = useState('')
    const [address, setAddress] = useState(null)
  
  const [long, setLong] = useState('')
  const [lat, setLat] = useState('')

    //  Object.keys(location).forEach(key=>console.log('key', key))
    
    // let array = [Object.keys(location)];   
//const latlng = { lat: position.coords.latitude, lng: position.coords.longitude }

  let mappedMarker = markers.map((marker, index) =>{
    return(
<Marker
coordinate={marker.location}
title={marker.title}
 />
    )
  })
    console.log(location)




    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
       let  location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});
        setLocation(location);
        props.getLocation(location)
     setLat(+location?.coords.latitude)
    setLong(+location?.coords.longitude)
    setLatLng({lat, long})

    let address = await Location.reverseGeocodeAsync({latitude:+lat, longitude:+long})
    setAddress(address)
   // console.log(address)
//alertAddy()

      })();
    },[ address]);
  //What to put in the brackets to make it updata address whenever the address changes

function alertAddy(){
  alert(JSON.stringify(address))
}    
    
 //console.log(address, "console.log")

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
//console.log(Object.latitude)
    const myPlace = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
               coordinates: [lat, long],
            }
          }
        ]
      };
//check to make sure it is not null
   
    return (
        
       
      <View style={styles.container}>
       <Text>Longitude:{long}</Text>
          <Text>Latitude:{lat}  </Text>
    <Text>{JSON.stringify(address)}</Text>
        <MapView
           style={styles.mapStyle}
           initialRegion={{
             latitude: lat,
             longitude: long,
             latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
           }}
            >
       {mappedMarker}
       
        </MapView>

      </View>
     
    );
  }

const mapStateToProps = state =>{
  return{
    location: state.location
  }
}

export default connect(mapStateToProps,{getLocation})(Landing)

const styles = StyleSheet.create({
  container: {
    marginTop:'25%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});