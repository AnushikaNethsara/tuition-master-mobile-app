import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  RefreshControl,
  ScrollView
} from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { PrimaryButton } from "../components/Button";
import constants from "../../consts/constants";
import { AsyncStorage } from 'react-native';
import axios from "axios";
import LessonCard from "../components/LessonCard";
import LessonCardSkelton from "../components/loading/LessonCardSkelton"
const { width } = Dimensions.get("screen");
const card = width;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const AllLessonsScreen = ({ navigation }) => {

//
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


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

    }, constants.timeOut);
    return () => clearTimeout(timing);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Find Lesson</Text>
      </View>
      {loading && <LessonCardSkelton />}
      {!loading &&
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {
            allLessons.map((item) => {
              return (
                <LessonCard lesson={item} navigation={navigation} key={item._id} />
              )
            })
          }
        </ScrollView>

      }
      {/* 
      {!loading &&
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={allLessons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <LessonCard lesson={item} navigation={navigation} key={item._id} />
          )}
        />
      } */}


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
