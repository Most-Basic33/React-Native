import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Image } from 'react-native'
import io from 'socket.io-client'
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
//import Thumb from './Thumb'
import * as VideoThumbnails from 'expo-video-thumbnails';
 import { Video } from 'expo-av';



let socket;

const Video1 = ({navigation}) =>{
    const [message, setMessage] = useState('')
    const [receivedMessages, setReceivedMessages] = useState([])
    const[receivedVideo, setReceivedVideo] = useState([])
    const [room, setRoom] = useState(null)
    const [roomID, setRoomID] = useState([])
    const [joined, setJoined] = useState(false)
    const [name, setName] =useState('')
  //Camera only
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState('')
    const [recording, setRecording] = useState(false)
    const [videos, setVideo] = useState([])//I get invalid prop type unless i set this to null but then I get other problems
    const [photos, setPhotos] = useState(null)

     

    let mapped = []
   
// End of Camera code

useEffect(()=>{
   socket = io(`http://192.168.0.115:5555`)
 // socket = io.connect()
socket.on('message from server', message => {
   setReceivedMessages(receivedMessages => [...receivedMessages, message])
})
//getCamera()

},[])

console.log(videos.length,'video')
 
//Attempted useEffect to receive Videos
useEffect(()=>{
socket.on('message data', videos=> {
  setReceivedVideo(receivedVideo => [...receivedVideo, videos])
})
console.log(receivedVideo, 'received')



},[])
 
useEffect(()=>{
setRoom(room)

},[room])
 
// useEffect(()=>{
// if(videos ===  ''){
// setVideo(null)
// }

// },[videos === null])



useEffect(() =>{
    socket.on('room joined', rooms =>{
        joinRoom()
        if(joined) joinSucess(rooms);
        setRoomID(rooms)
       // console.log(rooms)
    })
},[])


 const removeVideo=()=>{
   setVideo('')
   console.log(videos)
 }
 
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
//Attempted to send video thru sockets
const sendVideo = () =>{
  if(roomID.length < 1){ 
    alert('must join room' )
    return
  }
 socket.emit('message sent', {videos, roomID}) 
console.log('hit')

}
//Attempted to send message through sockets
const sendMessage = () => {
if(roomID.length < 1){ 
  alert('must join room' )
  return
}
message?socket.emit('message', {name,message, roomID}):null
console.log('hit')
}

//Mapped URI from video object

  mapped = String(receivedVideo.map(video=>video.videos))
  console.log(mapped )

  
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
 
{/* <Video
  source={{  uri: mapped}}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  useNativeControls={true}
  style={{ width: 300, height: 300  }}
/> */}
<Text  style={{fontSize:20, padding:10}} onPress={()=>navigation.navigate('Landing')} >Click for maps</Text>
<TextInput 
    clearButtonMode='always'
    style={styles.textInput}
    value={message}
    onChangeText={(text) => setMessage(text)}
/>
<Button onPress={() => sendVideo()} title='send Video' />

<Button onPress={() => sendMessage()} title='send message'  style={{gap:10}}/>
<View style={{ flex: 1 }}>
      <Camera 
      ref={ref => {
        setCameraRef(ref) ;
  }}
      style={{ width:350, height:300, paddingBottom:20 }} 
      type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name={ Platform.OS === 'ios' ? "ios-reverse-camera" : 'md-reverse-camera'} size={40} color="white" />
            {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo.uri);
              setPhotos(photo)
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:50,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
               
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:50,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'space-around'}} onPress={async() => {
              if(!recording){
                setRecording(true)
              let video = await cameraRef.recordAsync();
              console.log('video', video.uri);
              setVideo(video.uri)
            } else {
                setRecording(false)
                cameraRef.stopRecording()
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:50,
               borderColor: 'red',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:50,
                 borderColor: recording ? "blue":'red',
                 height: 40,
                 width:40,
                 backgroundColor: recording ? "blue":'red'}} >
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </Camera>  
    </View>
 
    <Video
  source={{  uri: videos }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  useNativeControls={true}
  style={{ width: 300, height: 300  }}
/>
<Button onPress={()=>removeVideo()} style={{width:150, height:150, resizeMode:'contain'}} title='Delete Video' />
<Image source={photos} style={{width:150, height:150, resizeMode:'contain'}} />
    </ScrollView>
</View>
)
}

// const record = async() =>{
//     if(camera){

//         let re = await camera.recordAsync()
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'scroll'
       
      
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
    },
    butts: {
      
    }
})
export default Video1
