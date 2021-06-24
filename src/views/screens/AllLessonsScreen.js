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
import { PrimaryButton } from "../components/Button";
import constants from "../../consts/constants";
import { AsyncStorage } from 'react-native';
import axios from "axios";
import LessonCard from "../components/LessonCard"
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
  }
});

export default AllLessonsScreen;
