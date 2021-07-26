import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, Alert, Modal, Pressable, TouchableOpacity, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { SecondaryButton, FeedbackButton } from '../components/Button';
import axios from "axios";
import constants from "../../consts/constants";
import { Rating } from "react-native-elements";
import { AsyncStorage } from 'react-native';
const { width } = Dimensions.get("screen");
const card = width;


const DetailsScreen = ({ navigation, route }) => {

  const { lesson } = route.params;
  const [rate, setRate] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [lessonStatus, setLessonStatus] = useState(false);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getRatings();
    getLessonStatus();
  }, [])
  const closeModel = () => {
    setModalVisible(false)
  }
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
    setModalVisible(true)
    //navigation.navigate("MyLessons");
  }


  const getRatings = () => {
    try {
      axios.get(constants.backend_url + "/rating/get-rate/" + lesson._id)
        .then(res => {
          var total = res.data.total;
          var count = res.data.count;
          if (total != 0 && count != 0) {
            var actualRate = (total / count);
            setRate(parseFloat(actualRate.toFixed(1)));
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
          source={{ uri: constants.backend_url + "/paypal" }}
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
        {/* model success */}
        <View style={style.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>Successfully Purchased</Text>
                <Pressable
                  style={[style.button, style.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={style.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* end model success */}
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
  },

  //model
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: card / 1.3,
    height: card / 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2191F3",
    width: card / 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize:20
  }
  
});

export default DetailsScreen;
