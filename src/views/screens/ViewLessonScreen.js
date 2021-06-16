import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import lessons from "../../consts/lessons";
import { PrimaryButton } from "../components/Button";
const { width } = Dimensions.get("screen");
const card = width;

const ViewLessonScreen = ({ navigation, route }) => {
  const item = route.params;
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>View Lessons</Text>
      </View>
      <Text style={{ fontSize: 25, fontWeight: "bold", color: "black" }}>
        id: {item.id}
      </Text>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ViewLessonScreen;
