import React, { useState, useEffect } from 'react';
import lessons from "../../consts/lessons";
import {
  TouchableHighlight,
} from "react-native-gesture-handler";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
const { width } = Dimensions.get("screen");
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Rating } from "react-native-elements";
import lessonImage from "../../consts/lessonImage";
import constants from "../../consts/constants";
import axios from "axios"

const cardWidth = width /1.8

const HomeCard = ({ navigation, lesson }) => {
  const [img, setImg] = useState();
  const [rate, setRate] = useState(0);

  const getLessonImage = () => {
    var cardSubject = lesson.subject;

    if (lessonImage.find(element => element.subject === lesson.subject)) {
      var index = lessonImage.findIndex(element => element.subject === lesson.subject)
      setImg(lessonImage[index].image)
    } else {
      setImg(lessonImage[3].image)
    }

  }

  const getRating = () => {
    try {
      axios.get(constants.backend_url + "/rating/get-rate/" + lesson._id)
        .then(res => {
          if (res.data.rate!=0){
            var allRate = res.data.rate;
            var count = res.data.count;
            var actualRate = allRate / count;
            setRate(actualRate);
          }
          
        })

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setRate(0);
    setImg()
    getLessonImage()
    getRating()
  }, [])


  return (
    <TouchableHighlight
      underlayColor={COLORS.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("DetailsScreen", lessons)}
    >
      <View style={style.card}>
        <View style={{ alignItems: "center", top: -60, marginTop: 15 }}>
          <Image source={img} style={{ height: 120, width: 120 }} />
        </View>
        <View style={{ marginHorizontal: 15, top: -20 }}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 15,
              fontWeight: "bold",
              top: -30,
            }}
          >
            {lesson.lesson}
          </Text>
          <View style={{ flexDirection: "row", marginTop: -25 }}>
            <View style={{ flex: 1 }}>
              <Text style={style.commonText}>
                {lesson.subject}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={style.grade}>
                {lesson.grade}
              </Text>
            </View>
          </View>
          <Rating
            style={{ marginTop: 3 ,marginLeft:-70}}
            imageSize={20}
            startingValue={3}
            readonly={true}
          />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.grey,
              marginTop: 2,
              marginHorizontal: 0,
            }}
          >
            {lesson.master_id.first_name} {lesson.master_id.last_name}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            top: -20,
            marginHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: -10 }}>
            {lesson.price} LKR
          </Text>

        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  card: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  commonText: {
    fontSize: 15,
    color: COLORS.grey,
    fontWeight: "bold",
    justifyContent: 'flex-start'
  },
  grade: {
    fontSize: 15,
    color: COLORS.grey,
    fontWeight: "bold",
    marginLeft: 15,
    justifyContent: 'flex-end'
  }
});

export default HomeCard;