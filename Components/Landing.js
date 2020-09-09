import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, requireNativeComponent } from 'react-native';

const Landing =(props)=> {

    
  
    return (
        
       
      <View style={styles.container}>
       
        <MapView style={styles.mapStyle} />
      </View>
     
    );
  }
export default Landing

const styles = StyleSheet.create({
  container: {
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