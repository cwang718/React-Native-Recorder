import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();
  const [recordingUri, setRecordingUri] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    setRecordingUri(uri);
  }

  async function playRecording() {
    const { sound } = await Audio.Sound.createAsync({
      uri: recordingUri,
    }).then(setSound(sound)).then(console.log("Sound set"));
    await sound.playAsync();
    console.log("Playing sound");
  }

  return (
    <View >
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button 
        title={"Play recording"}
        onPress={playRecording}
      />
    </View>
  );
}

// import { StatusBar } from 'expo-status-bar';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Card, Title,  Button } from 'react-native-paper';
// import AudioRecorderPlayer, { 
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption, 
//   AudioEncoderAndroidType,
//   AudioSet,
//   AudioSourceAndroidType, 
//  } from 'react-native-audio-recorder-player';

//  class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoggingIn: false,
//       recordSecs: 0,
//       recordTime: '00:00:00',
//       currentPositionSec: 0,
//       currentDurationSec: 0,
//       playTime: '00:00:00',
//       duration: '00:00:00',
//     };
//     this.audioRecorderPlayer = new AudioRecorderPlayer();
//     this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
//   }

//   onStartRecord = async () => {
    
//     const path = 'hello.m4a';
//     const audioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//     };
//     console.log('audioSet', audioSet);
//     console.log('audioRecorderPlayer', this.audioRecorderPlayer);
//     const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet).catch(err => console.log("err mess: " + err.message));
//     this.audioRecorderPlayer.addRecordBackListener((e) => {
//       this.setState({
//         recordSecs: e.current_position,
//         recordTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),x
//         ),
//       });
//     }).console.log(err => console.log("addRecordBackListener err: " + err.message));
//     console.log(`uri: ${uri}`);
//   };

//   render() {
//     return (
//       <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
//           <Title>{this.state.recordTime}</Title>
//           <Button mode="contained" icon="record" onPress={() => this.onStartRecord()}>
//             RECORD
//         </Button>

//           <Button
//             icon="stop"
//             mode="outlined"
//             onPress={() => this.onStopRecord()}
//           >
//             STOP
//     </Button>
//           <Title>{this.state.playTime} / {this.state.duration}</Title>
//           <Button mode="contained" icon="play" onPress={() => this.onStartPlay()}>
//             PLAY
//         </Button>

//           <Button
//             icon="pause"
//             mode="contained"
//             onPress={() => this.onPausePlay()}
//           >
//             PAUSE
//     </Button>
//           <Button
//             icon="stop"
//             mode="outlined"
//             onPress={() => this.onStopPlay()}
//           >
//             STOP
//     </Button>
//       </Card>
//     );
//   }
//  }

//  export default App;