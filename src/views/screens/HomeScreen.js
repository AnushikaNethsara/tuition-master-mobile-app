import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Alert
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import COLORS from "../../consts/colors";
import lessons from "../../consts/lessons";
import homeImages from "../../consts/homeImages";
import ListCategories from "../components/ListCategories";
import HomeCard from "../components/HomeCard";
import NameHeader from "../components/NameHeader";
import SwapCards from "../components/SwapCards";
import constants from "../../consts/constants";
import { AsyncStorage } from 'react-native';
import axios from "axios"
const { width } = Dimensions.get("screen");
const cardWidth = width - 20;


const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    retrieveUserData();
    getAllLessons();
  }, [])

  const getUserDetails = (id) => {
    try {
      axios.get(constants.backend_url + "/student/studentaccountdetails/" + id)
        .then(res => {
          res.data.forEach(element => {
            setUserName(element.first_name)
          });
        })

    } catch (err) {
      console.log(err.response.data.msg)
    }
  }

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

  const CardSample = () => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
      >
        <View style={style.card1}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}style={{ height: 120, width: 120, borderRadius: 100 }} />
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Keom ndk ss</Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              Keom ndk ss
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              $1500
            </Text>
          </View>
        </View>
      </TouchableHighlight>

    );
  };



  const retrieveUserData = async () => {
    try {
      const getToken = await AsyncStorage.getItem('token');
      const getUserId = await AsyncStorage.getItem('userId');
      if (getToken !== null && getUserId !== null) {
        setToken(getToken);
        setUserId(getUserId);
        getUserDetails(getUserId);
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

  var imageItem = homeImages[Math.floor(Math.random() * homeImages.length)];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <NameHeader navigation={navigation} userName={userName} />
      <View style={{ height: cardWidth / 2, width: cardWidth }}>
        <Image
          style={{
            width: "100%",
            resizeMode: "contain",
            top: -50,
            borderRadius: 3,
            marginHorizontal: 10,
          }}
          source={imageItem.image}
        />
      </View>
      
      <ScrollView style={{ marginHorizontal: 10 }}>
        <CardSample />
        <SwapCards navigation={navigation} title={"Featured"} lessons={allLessons} />
        <SwapCards navigation={navigation} title={"Students are viewing"} lessons={allLessons} />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  buyBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
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
});

export default HomeScreen;
