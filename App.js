import 'react-native-gesture-handler';
import   React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Landing from './Components/Landing'
import {Button, requireNativeComponent} from 'react-native'
import Register from './Components/Register'
import Video1 from './Components/Video1'
import CreateRoom from './Components/CreateRoom'
import Room from './Components/Room'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import { Audio } from 'expo-av';
import store from './redux/store'
import {Provider} from 'react-redux'




const Stack = createStackNavigator();


const App = () => {

  const [location, setLocation] = useState('')
console.log(location)
  useEffect(() => {
    getLocationAsync()
    getContanct()
    Audio.requestPermissionsAsync()
  }, [])
  // async function alertIfRemoteNotificationsDisabledAsync() {
  //   const { status } = await Permissions.getAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     alert('Hey! You might want to enable Location for my app, they are good.');
  //   }
 
  // }
   
async function getContanct(){
  const {status, permissions} = await Permissions.askAsync(Permissions.CONTACTS)
  if(status === 'granted'){
    return Contacts.getContactsAsync()
  }else {
    throw new Error('Contants not granted')
  }
}



  async function getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return setLocation(Location.getCurrentPositionAsync({ enableHighAccuracy: true }));
    } else {
      throw new Error('Location permission not granted');
    }
  }

  return(
    <Provider store={store}>

   
    <NavigationContainer>
   <Stack.Navigator>
     <Stack.Screen
     name='Login'
     component={Login}
     initialParams='/login'
     options={{title: 'Helping People, help people'}}
      />
     <Stack.Screen 
       name='Landing'
       component={Landing}
       options={{headerTintColor:'red', title: 'Welcome to the Map pimp'}}
     />
     <Stack.Screen 
       name='Register'
       component={Register}
       options={{title:'Register To Vote, or App'}}
     />
     <Stack.Screen 
       name='Video'
       component={Video1}
     />
     <Stack.Screen
     name = 'CreateRoom'
     component = {CreateRoom}
      />
     
   </Stack.Navigator>
 
    </NavigationContainer>
    </Provider>
  )
}
export default App