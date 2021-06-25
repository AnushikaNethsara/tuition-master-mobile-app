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
  const [allCount, setAllCount] = useState(0);


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
    getRatings()
  }, [])

  const getRatings = () => {
    try {
      axios.get(constants.backend_url + "/rating/get-rate/" + lesson._id)
        .then(res => {
          var total = res.data.total;
          var count = res.data.count;
          if (total != 0 && count != 0) {
            setRate(total / count);
            setAllCount(count);
          }
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }





  return (
    <TouchableHighlight
      underlayColor={COLORS.white}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("DetailsScreen", { lesson: lesson })}
    >
      <View style={style.card}>
        <View style={{ alignItems: "center", top: -60, marginTop: 15 }}>
          <Image source={img} style={{ height: 120, width: 120 }} />
        </View>
        <View style={{ marginHorizontal: 15, top: -20 }}>
          <Text
            numberOfLines={1}
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
          {/* <Rating
            style={{ marginTop: 3 ,marginLeft:-70}}
            imageSize={20}
            startingValue={3}
            readonly={true}
          /> */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0 }}>
            <Text style={style.rate}>({rate})</Text>
            <Rating
              style={{ marginTop: 8, paddingHorizontal: 8 }}
              imageSize={20}
              startingValue={rate}
              readonly={true}
            />
            <Text style={style.rate} >({allCount})</Text>
          </View>
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
          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 0 }}>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card1: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  },
  rate: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.grey,
    fontWeight: "bold",
    marginLeft: 0
  }
});

export default HomeCard;