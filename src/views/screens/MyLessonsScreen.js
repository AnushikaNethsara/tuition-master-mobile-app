import React from "react";
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
import lessons from "../../consts/lessons";
import { PrimaryButton } from "../components/Button";
const { width } = Dimensions.get("screen");
const card = width;

const MyLessonsScreen = ({ navigation }) => {
  const LessonCard = ({navigation, lesson }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("ViewLessonScreen", lesson)}
      >
        <View style={style.lessonCard}>
          <Image source={lesson.image} style={{ height: 90, width: 90 }} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: -5,
              flex: 1,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "left" }}
            >
              {lesson.name}
            </Text>
            <Text
              style={{ fontSize: 16, color: COLORS.grey, fontWeight: "bold" }}
            >
              {lesson.master}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.grey,
                marginTop: 2,
              }}
            >
              {lesson.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Lessons</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={lessons}
        renderItem={({ item }) => (
          <LessonCard lesson={item} navigation={navigation} />
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
  },
  lessonCard: {
    height: card / 2.5,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MyLessonsScreen;
