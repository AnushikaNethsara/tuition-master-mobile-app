import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import axios from "axios";
import constants from "../../consts/constants";
import lessons from "../../consts/lessons";
import { PrimaryButton } from "../components/Button";
import { Video, AVPlaybackStatus } from "expo-av";
const { width } = Dimensions.get("screen");
const card = width;

const ViewLessonScreen = ({ navigation, route }) => {
  const { lesson} = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [mylessons, setMyLessons] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");




  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>View Lessons</Text>
      </View>
      <View style={{marginTop:-250}}>
        <View>
          <Video
            ref={video}
            style={{  height: "90%",marginHorizontal:3 }}
            source={{
              uri: lesson.lesson_id.video_path
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
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ViewLessonScreen;
