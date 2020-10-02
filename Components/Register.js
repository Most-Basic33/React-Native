import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, requireNativeComponent } from 'react-native';
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from './../redux/videoReducer'


 function Register({ navigation }) {
  let url = `http://192.168.0.115:5555/api/`

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  console.log(email, 'email')
  console.log(password, 'password')

  useEffect(() => {
//console.log(props)
  }, [])
 

  const register = () => {
    console.log('hit')
    let body = { email, password }
    // console.log(body)
    axios.post(`${url}register`, body)
      .then((res) => {
       getUser(res.data)
        navigation.navigate('Video')
        console.log('done')
      })
      .catch(err => {
        console.log(err, "written error")
      })
  }
  return (

    <View style={styles.container}>
      <Text style={{fontSize:20, paddingBottom:20}} onPress={()=>navigation.navigate('Login')} >Click To Login</Text>
    
      <View style={styles.login_parent} >
        <View style={styles.login_child} >
          <TextInput
            clearButtonMode='always'
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}

          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType='password'
            style={styles.textInput} />
          <Button title='Register' onPress={register} />

        </View>
      
      </View>
    </View>
  );
}

export default connect(null,{getUser})(Register)

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
    padding: 10,
    borderWidth: 3,
    margin: 5,
    fontSize: 20,
    height: 50,
    width: 200,
    borderColor: '#bbb'
  },

});
