 import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  console.log(email, password)
  return (
    <View style={styles.container}>
      <Text>Login To Continue</Text>
       <Text>
         
       
       </Text>
     <View style={styles.login_parent} >
<View style={styles.login_child} >
<TextInput 
clearButtonMode={true}
style={styles.textInput}  
  value={email}
  onChangeText={(text)=>setEmail(text)}
   
/>
<TextInput
value={password}
onChangeText={(text)=>setPassword(text)}
autoCompleteType='password'
textContentType='password'
 style={styles.textInput}/>
<Button title='Login' />

</View>
     </View>
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
  login_parent: {
 

  },
  login_child: {

  },
  textInput: {
     padding:10,
    borderWidth:3,
    margin:5,
    fontSize:20,
    height:50,
    width:200,
    borderColor:'#bbb'
  },
  
});
