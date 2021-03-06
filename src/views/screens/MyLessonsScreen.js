import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl,
  ScrollView
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
import LessonCardSkelton from "../components/loading/LessonCardSkelton"
const { width } = Dimensions.get("screen");
const card = width;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MyLessonsScreen = ({ navigation }) => {

  const [mylessons, setMyLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getMyLessons();
  }, []);

  useEffect(() => {
    retrieveUserData();
  }, [])


  const getMyLessons =async () => {
    const getUserId = await AsyncStorage.getItem('userId');
    setLoading(true);
    const timing = setTimeout(() => {
      try {
        axios.get(constants.backend_url + "/purchase/mylessons/" + getUserId)
          .then(res => {
            setMyLessons(res.data)
          })
        setLoading(false);

      } catch (err) {
        console.log(err)
      }

    }, constants.timeOut);
    return () => clearTimeout(timing);
  }

  const retrieveUserData = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      const getUserId = await AsyncStorage.getItem('userId');
      if (getToken !== null && getUserId !== null) {
        setToken(getToken);
        setUserId();
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
      var cardSubject = lesson.lesson_id.subject;
      if (lessonImage.find(element => element.subject === cardSubject)) {
        var index = lessonImage.findIndex(element => element.subject === cardSubject)
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
        onPress={() => navigation.navigate("LessonResourcesScreen", { lesson: lesson, studentId: userId })}
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
              style={{ fontWeight: "bold", fontSize: 15, textAlign: "left", marginTop: -15 }}
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
              numberOfLines={2}
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
      {loading && <LessonCardSkelton />}
      {!loading &&
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {
            mylessons.map((item)=>{
              return(
                <LessonCard lesson={item} navigation={navigation} key={item._id} />
              )
            })
          }
        </ScrollView>
        
      }

      {
        mylessons.length != 0 ? (<></>) :
          (<View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: COLORS.grey, textAlign: "center", marginTop: -500 }}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
