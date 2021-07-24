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
import SearchSwapCards from "../components/SearchSwapCards";
import SwapCards from "../components/SwapCards";
import lessons from "../../consts/lessons";
import constants from "../../consts/constants";
import { Rating } from "react-native-elements";


const SearchScreen = ({ navigation }) => {
  const [grade, setGrade] = useState("Grade 11");
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllLessons();
  }, [])

  const getAllLessons = () => {
    try {
      axios.get(constants.backend_url + "/lesson/by-grade/" + grade)
        .then(res => {
          const array = chunkArray(res.data);
          setData(array)
        })

    } catch (err) {
      console.log(err)
    }
  }

  const getSearchedLessons = (keyword) => {
    try {
      if(keyword !=""){
        axios.get(constants.backend_url + "/lesson/search/" + keyword)
          .then(res => {
            const array = chunkArray(res.data)
            setData(array)
          })
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleGrade = (selectedGrade) => {
    setGrade(selectedGrade);
    try {
      axios.get(constants.backend_url + "/lesson/by-grade/" + grade)
        .then(res => {
          const array = chunkArray(res.data)
          setData(array)
        })

    } catch (err) {
      console.log(err)
    }

  }

  const chunkArray = (items) => {
    const chunks = []
    items = [].concat(...items)

    while (items.length) {
      chunks.push(
        items.splice(0, 3)
      )
    }

    return chunks
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Search getSearchedLessons={getSearchedLessons} />
      <View style={{ marginTop: 10 }}>
        <ListCategories handleGrade={handleGrade} />
      </View>
      {
        data.length === 0 ?
          (
            <View style={{ flexDirection: "row", padding: 20 }}>
              <Text style={{ fontSize: 28 }}>No Result</Text>
            </View>
          ) : (<></>)
      }

      <ScrollView style={{ marginHorizontal: 10 }}>
        {data &&
          data.map((item, index) => {
            return (
              <SwapCards navigation={navigation} title={""} lessons={item} key={index} />
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
