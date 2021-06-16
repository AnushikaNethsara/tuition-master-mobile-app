import * as React from "react";
import { View, StyleSheet, Button, Text, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import axios from "axios";

export default function Player() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [test, setTest] = React.useState();
  React.useEffect(() => {
    fetch("http://192.168.1.11:3333/api/videoList")
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });

  });
  return (
    <View>
      <Text>Player{test}</Text>
      <View>
        <Video
          ref={video}
          style={{ width: "90%", height: "90%" }}
          source={{
            uri: "http://192.168.1.11:3333/api/videos/file_-1623253341251.mp4",
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
