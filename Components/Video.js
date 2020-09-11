import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, Button, ScrollView} from 'react-native'
import io from 'socket.io-client'

let socket;

const Video = ({navigation}) =>{
    const [message, setMessage] = useState('')
    const [receivedMessages, setReceivedMessages] = useState([])
 
useEffect(()=>{
    socket = io(`http://192.168.0.115:5555`)
 // socket = io.connect()
socket.on('message', message => {
    console.log(message)  ,setReceivedMessages(receivedMessages => [...receivedMessages, message])
})


},[ ])


//   const sendMessage = () => {
//       console.log('hit')
//       if(message){
//           socket.emit('messaage', message)
//         }
//         console.log(message)
//   }
const sendMessage = () => {

message?socket.emit('message', message):null
console.log('hit')
}
//Added for flatlist
const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

    const mappedMessages = receivedMessages.map((message, index) =>{
        return(
            <Text key={index} style={{borderWidth: 2, width: 200}}>{index}: {message}</Text>
        )
    })
return(
<View style={styles.container}>
<ScrollView>{mappedMessages}
  </ScrollView>

<Text  style={{fontSize:20, padding:10}} onPress={()=>navigation.navigate('Landing')} >Click for maps</Text>
<TextInput 
    clearButtonMode='always'
    style={styles.textInput}
    value={message}
    onChangeText={(text) => setMessage(text)}
/>
<Button onPress={() => sendMessage()} title='send' />
 
</View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      
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
    butt: {
        alignContent:'center',
        height:100,
        width:200,
        justifyContent:'space-between'  
    }
})
export default Video
