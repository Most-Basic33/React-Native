import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, Button, ScrollView} from 'react-native'
import io from 'socket.io-client'
import queryString from 'query-string'


 

let socket;

const Video = (props,{navigation}) =>{
    const [message, setMessage] = useState('')
    const [receivedMessages, setReceivedMessages] = useState([])
    const [room, setRoom] = useState(null)
    const [roomID, setRoomID] = useState([])
    const [joined, setJoined] = useState(false)
    const [name, setName] =useState('')
  


useEffect(()=>{
    socket = io(`http://192.168.0.115:5555`)
 // socket = io.connect()
socket.on('message from server', message => {
   setReceivedMessages(receivedMessages => [...receivedMessages, message])
})


},[])


 
 
useEffect(()=>{
setRoom(room)
console.log(props.route.key)
},[])
// useEffect(() => {
     
//     const { room } = queryString.parse(location.search)
    
//     setRoom(room)
 

//  }, [location.search])



useEffect(() =>{
    socket.on('room joined', rooms =>{
        joinRoom()
        if(joined) joinSucess(rooms);
        setRoomID(rooms)
       // console.log(rooms)
    })
},[])

 
 
const joinRoom = () => {
    if(room){
        socket.emit('join room', {
            room: room
        })
    }
    
}

const joinSucess = () => {
    setJoined(true)
}



const sendMessage = () => {

message?socket.emit('message', {name,message, roomID}):null
console.log('hit')
}


//console.log(props)

    const mappedMessages = receivedMessages.map((message, index) =>{
        return(
            <View key={index}> 
            <Text  style={{borderWidth: 2, width: 200}}>{index}: {message.name}</Text>
            <Text  style={{borderWidth: 2, width: 200}}>{index}: {message.message}</Text>
            </View>
        )
    })
return(
<View style={styles.container}>
<TextInput 
    clearButtonMode='always'
    style={styles.textInput}
    value={room}
    onChangeText={(text) => setRoom(text)}
/>
<Button onPress={joinRoom} title='enter room'  />
<TextInput 
    clearButtonMode='always'
    style={styles.textInput}
    value={name}
    placeholder='Enter Name'
    onChangeText={(text) => setName(text)}
/>
 
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
