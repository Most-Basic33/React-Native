import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Landing from './Components/Landing'
import {Button, requireNativeComponent} from 'react-native'
import Register from './Components/Register'

const Stack = createStackNavigator();


const App = () => {

  return(
    <NavigationContainer>
   <Stack.Navigator>
     <Stack.Screen
     name='Login'
     component={Login}
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
   </Stack.Navigator>
 
    </NavigationContainer>
  )
}
export default App