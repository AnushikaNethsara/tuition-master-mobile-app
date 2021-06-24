import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import lessons from "../../consts/lessons";
import axios from "axios";
import { AsyncStorage } from 'react-native';
import constants from "../../consts/constants";
import lessonImage from "../../consts/lessonImage";
import { PrimaryButton } from "../components/Button";
const { width } = Dimensions.get("screen");
const card = width;
//
const MyLessonsScreen = ({ navigation }) => {

  const [mylessons, setMyLessons] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    retrieveUserData();
  }, [])

  const getMyLessons = (id) => {
    try {
      axios.get(constants.backend_url + "/purchase/mylessons/" + id)
        .then(res => {
          setMyLessons(res.data)
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

  const retrieveUserData = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      const getUserId = await AsyncStorage.getItem('userId');
      if (getToken !== null && getUserId !== null) {
        setToken(getToken);
        setUserId(getUserId);
        getMyLessons(getUserId);
      }
    } catch (error) {
      Alert.alert(
        "Alert",
        "Something went wrong!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  };


  const LessonCard = ({ navigation, lesson }) => {
    const [img, setImg] = useState();

    const getLessonImage = () => {
      var cardSubject = lesson.subject;

      if (lessonImage.find(element => element.subject === lesson.subject)) {
        var index = lessonImage.findIndex(element => element.subject === lesson.subject)
        setImg(lessonImage[index].image)
      } else {
        setImg(lessonImage[3].image)
      }

    }

    useEffect(() => {
      setImg()
      getLessonImage()
    }, [])

    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("ViewLessonScreen", { lesson: lesson })}
        key={lesson._id}
      >
        <View style={style.lessonCard}>
          <Image source={img} style={{ height: 90, width: 90 }} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: -5,
              flex: 1,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "left", marginTop: -20 }}
            >
              {lesson.lesson_id.lesson}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
              <Text style={style.commonText}>
                {lesson.lesson_id.subject}
              </Text>
              <Text style={style.grade}>
                {lesson.lesson_id.grade}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginTop: 2,
              }}
            >
              {lesson.lesson_id.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Lessons</Text>
      </View>
      {
        mylessons.length !=0 ? (<View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={mylessons}
            renderItem={({ item }) => (
              <LessonCard lesson={item} navigation={navigation} key={item._id} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>):
      (<View>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: COLORS.grey, textAlign: "center" }}
        >No Lessons
        </Text>
      </View>)
      }



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
  lessonCard: {
    height: card / 2.5,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  commonText: {
    fontSize: 16,
    color: COLORS.grey,
    fontWeight: "bold",
  },
  grade: {
    fontSize: 16,
    color: COLORS.grey,
    fontWeight: "bold",
    marginLeft: 15
  }
});

export default MyLessonsScreen;
