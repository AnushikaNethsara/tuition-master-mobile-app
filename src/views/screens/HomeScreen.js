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
import HomeCardSkelton from "../components/loading/HomeCardSkelton";
import axios from "axios"
const { width } = Dimensions.get("screen");
const cardWidth = width - 20;


const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      try {
        axios.get(constants.backend_url + "/lesson/")
          .then(res => {
            setAllLessons(res.data)
          })
        setLoading(false);

      } catch (err) {
        console.log(err)
      }

    }, 500);
    return () => clearTimeout(timing);
  }, []);

  const getAllLessons = () => {

    setLoading(true);
    const timing = setTimeout(() => {
      try {
        axios.get(constants.backend_url + "/lesson/")
          .then(res => {
            setAllLessons(res.data)
          })
        setLoading(false);

      } catch (err) {
        console.log(err.response.data.msg)
      }

    }, 1000);
    return () => clearTimeout(timing);
  }

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
        {loading && <HomeCardSkelton />}
        {!loading &&
          <SwapCards navigation={navigation} title={"Featured"} lessons={allLessons} />
        }
        {!loading &&
          <SwapCards navigation={navigation} title={"Students are viewing"} lessons={allLessons} />
        }
        
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
  }
});

export default HomeScreen;
