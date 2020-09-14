import React, {useState} from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

const Thumb =(props)=> {
  const [image, setImage] = useState('null')

  let array = [props.videos]
  let videoURI = array.map(vidz => vidz.uri)
   console.log(videoURI.length?videoURI:'...waiting', 'vidz uri')
  let vidz = String(videoURI)
  console.log(vidz, 'vidz')
 
  console.log(props.photos)

 const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
     vidz,
        {
          time: 15000,
        }
      );
    setImage({image: uri });
    } catch (e) {
      console.warn(e);
    }
  };

  
    return (
      <View style={styles.container}>
        <Button onPress={generateThumbnail} title="Generate thumbnail" />
        {image && <Image source={vidz} style={{ width: 200, height: 200 }} />}
        {/* <Text>{image}</Text> */}
        <Image source={props.photos} style={{width:100, height:100}} />
      </View>
    );
  }
 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Thumb



