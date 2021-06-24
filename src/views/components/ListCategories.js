import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import categories from "../../consts/categories";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");

const ListCategories = (props) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={style.categoriesListContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedCategoryIndex(index);
            props.handleGrade(category.name);
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == index
                  ? COLORS.primary
                  : COLORS.secondary,
              ...style.categoryBtn,
              width: 130,
            }}
          >
            <View style={style.categoryBtnImgCon}>
              <Image
                source={category.image}
                style={{ height: 20, width: 20, resizeMode: "cover" }}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color:
                  selectedCategoryIndex == index
                    ? COLORS.white
                    : COLORS.primary,
              }}
            >
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  categoriesListContainer: {
    paddingVertical: 0,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListCategories;
