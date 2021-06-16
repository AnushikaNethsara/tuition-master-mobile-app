import React,{useState,useEffect} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  FlatList,
  
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import ListCategories from "../components/ListCategories";
import HomeCard from "../components/HomeCard";
import Search from "../components/Search";
import lessons from "../../consts/lessons";
import constants from "../../consts/constants";
import { Rating } from "react-native-elements";


const SearchScreen = ({ navigation }) => {
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
      console.log(err)
    }
  }

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Search />
      <View style={{ marginTop: 10}}>
        <ListCategories />
     </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={allLessons}
        renderItem={({ item }) => (
          <HomeCard lesson={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};
 
export default SearchScreen;
