import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Alert, Modal, Pressable, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { SecondaryButton, FeedbackButton } from '../components/Button';
import axios from "axios";
import constants from "../../consts/constants";
import { Rating } from "react-native-elements";
import { AsyncStorage } from 'react-native';


const DetailsScreen = ({ navigation, route }) => {

  const { lesson } = route.params;
  const [rate, setRate] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [lessonStatus, setLessonStatus] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    getRatings();
    getLessonStatus();
  }, [])

  const handleResponse = (data) => {
    if (data.title === "success") {
      setShowModel(false);
      setStatus("Complete");
      proceed();
    } else if (data.title === "cancel") {
      setShowModel(false);
      setStatus("Cancelled")
    } else {
      return;
    }
  };

  const proceed = async () => {
    var studentId = await AsyncStorage.getItem('userId');
    console.log("u: " + studentId)
    console.log("u: " + lesson._id)
    await axios.post(
      constants.backend_url + "/purchase/addlesson-to-student-account",
      {
        student_id: studentId,
        lesson_id: lesson._id,
      }
    ).catch(function (error) {
      console.log(error);
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
    });
    navigation.navigate("MyLessons");
  }


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

  const getLessonStatus = async () => {
    try {
      var studentId = await AsyncStorage.getItem('userId');
      axios.get(constants.backend_url + "/lesson/view-buy/" + lesson._id + "/" + studentId)
        .then(res => {
          if (res.data.msg === "view") {
            setLessonStatus(true)
          }
          if (res.data.msg === "buy") {
            setLessonStatus(false)
          }
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <Modal
        visible={showModel}
        onRequestClose={() => setShowModel(false)}
      >
        <WebView
          source={{ uri: "http://192.168.1.11:5008/paypal" }}
          onNavigationStateChange={data =>
            handleResponse(data)
          }
          injectedJavaScript={`document.f1.submit()`}
        />
      </Modal>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 0 }}>
          {/* <Image
            style={{
              width: "100%",
              resizeMode: "contain",
              top: -200,
            }}
            source={require("../../assets/logo5.png")}
          /> */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={{
            uri: constants.backend_url + lesson.photo,
          }}
            style={{ height: 220, width: 220 }}
          />
          <Text>Payment Status: {status}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={style.rate}>({rate})</Text>
            <Rating
              style={{ marginTop: 12, paddingHorizontal: 10 }}
              imageSize={20}
              startingValue={rate}
              readonly={true}
            />
            <Text style={style.rate} >({allCount})</Text>
          </View>
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
              {lesson.lesson}
            </Text>
            {/* <View style={style.iconContainer}>
              <Icon name="favorite-border" color={COLORS.primary} size={25} />
            </View> */}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            <Text style={style.grade}>
              {lesson.grade}
            </Text>
            <Text style={style.commonText}>
              {lesson.subject}
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={style.master}>
              {lesson.master_id.first_name}{" "}{lesson.master_id.last_name}
            </Text>

          </View>
          <Text style={style.detailsText}>
            {lesson.description}
          </Text>
          <View>
            <FeedbackButton
              onPress={() => setShowModel(true)}
              title={"Feedbacks"}
              onPress={() => navigation.navigate("FeedbacksScreen", { lessonId: lesson._id })}
            />
          </View>
          <Text style={style.price}>
            {lesson.price}{" "}{"LKR"}
          </Text>

          {
            lessonStatus ? (
              <View
                style={{ marginTop: 20, marginBottom: 40 }}
              >
                <SecondaryButton
                  onPress={() => navigation.navigate("MyLessons")}
                  title={"View Lesson"}
                />
              </View>
            ) : (
              <View
                style={{ marginTop: 20, marginBottom: 40 }}
              >
                <SecondaryButton
                  onPress={() => setShowModel(true)}
                  title={"Buy Now "}
                />
              </View>
            )
          }

          <View
            style={{ marginTop: 20, marginBottom: 40 }}
          >
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  commonText: {

    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",
  },
  grade: {
    width: "50%",
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 0
  },
  price: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 0
  },
  master: {
    width: "50%",
    fontSize: 17,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 0
  },
  rate: {
    marginTop: 10,
    fontSize: 17,
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 0
  }
});

export default DetailsScreen;
