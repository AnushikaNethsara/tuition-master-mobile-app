import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ScrollView,
} from "react-native-gesture-handler";
import HomeCard from "./HomeCard";


const SwapCards = ({ navigation, title, lessons }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  return (
    <View>
      <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
        <Text style={{ fontSize: 28 }}>{title}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        {lessons.map((lesson, index) => (
          <HomeCard lesson={lesson} navigation={navigation} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 5,
  },
});

export default SwapCards;
