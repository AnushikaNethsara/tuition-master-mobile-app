import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text
} from "react-native";
import {
  FlatList,

} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import COLORS from "../../consts/colors";
import ListCategories from "../components/ListCategories";
import HomeCard from "../components/HomeCard";
import Search from "../components/Search";
import SwapCards from "../components/SwapCards";
import lessons from "../../consts/lessons";
import constants from "../../consts/constants";
import { Rating } from "react-native-elements";


const SearchScreen = ({ navigation }) => {
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [grade, setGrade] = useState("Grade 13");

  useEffect(() => {
    getAllLessons();
  }, [])

  const getAllLessons = () => {
    try {
      axios.get(constants.backend_url + "/lesson/by-grade/" + grade)
        .then(res => {
          setSelectedLessons(res.data)
        })

    } catch (err) {
      console.log(err)
    }
  }

  const handleGrade = (selectedGrade) => {
    setGrade(selectedGrade);
    try {
      axios.get(constants.backend_url + "/lesson/by-grade/" + grade)
        .then(res => {
          setSelectedLessons(res.data)
        })

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Search />
      <View style={{ marginTop: 10 }}>
        <ListCategories handleGrade={handleGrade} />
      </View>
      {
        selectedLessons.length === 0 ?
          (
            <View style={{ flexDirection: "row", padding: 20 }}>
              <Text style={{ fontSize: 28 }}>No Result</Text>
            </View>) : (<></>)
      }

      <ScrollView style={{ marginHorizontal: 10 }}>
        <SwapCards navigation={navigation} title={""} lessons={selectedLessons} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
