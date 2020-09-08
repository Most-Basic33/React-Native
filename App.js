import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';

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
     
   </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App