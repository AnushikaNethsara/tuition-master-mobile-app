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
import lessonImage from "../../consts/lessonImage";
import { PrimaryButton } from "../components/Button";
import constants from "../../consts/constants";
import { AsyncStorage } from 'react-native';
import { Rating } from "react-native-elements";
import axios from "axios"
const { width } = Dimensions.get("screen");
const card = width;

const AllLessonsScreen = ({ navigation }) => {


  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    getAllLessons();
  }, [])

  const getAllLessons = () => {
    try {
      axios.get(constants.backend_url + "/lesson/")
        .then(res => {
          setAllLessons(res.data)
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

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

    useEffect(()=>{
      setImg()
      getLessonImage()
    },[])


    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("ViewLessonScreen", lesson)}
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
              marginTop: -30
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, textAlign: "left" }}
            >
              {lesson.lesson}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
              <Text style={style.commonText}>
                {lesson.subject}
              </Text>
              <Text style={style.grade}>
                {lesson.grade}
              </Text>
            </View>
            <Text
              style={{ fontSize: 16, color: COLORS.grey, fontWeight: "bold" }}
            >
              {lesson.master_id.first_name} {lesson.master_id.last_name}
            </Text>
            <Rating
              style={{ marginTop: 2, marginLeft: -100 }}
              imageSize={20}
              startingValue={3}
              readonly={true}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Find Lesson</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={allLessons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <LessonCard lesson={item} navigation={navigation} key={item._id} />
        )}
      />
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

export default AllLessonsScreen;
